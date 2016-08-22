import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict';

const dict = new ReactiveDict('app');

const link = (href, text) => `<a href="${href}" style="color: white;">${text}</a>`;

const TYPING_SPEED_KEY = 'matteodem-typingspeed';
const typingSpeed = localStorage.getItem(TYPING_SPEED_KEY) || 43;

const linkify = str => {
  if (!str) {
    return str;
  }

  const links = str.match(/\([\/:\s\w\-\.]+\|>[\s\w\-]+\)/g);

  if (links) {
    links.forEach(linkDesc => {
      const linkDescWithBraces = linkDesc;
      const descParts = linkDesc.split('');

      descParts.splice(-1, 1);
      descParts.splice(0, 1);

      linkDesc = descParts.join('');

      const parts = linkDesc.split('|>');
      str = str.replace(linkDescWithBraces, link(parts[0], parts[1]));
    });
  }

  return str;
};

const bluescreenContent = [
  '',
  'matteodem hacked your browser.',
  '',
  '',
  '',
  'he was last seen drinking coffee nearby your hometown.', // TODO: randomize this text
  'send complaints to: my (http://bit.ly/mdm-twitter |> twitter), (http://bit.ly/mdm-github |> github) or (http://bit.ly/mdm-linkedin |> linkedin).',
  '',
  ''
];

dict.set('lines', (new Array(bluescreenContent.length)));

Template.bluescreen.onCreated(() => {
  const currentPos = { x: 0, y: 0 };

  const handle = Meteor.setInterval(() => {
    const lines = dict.get('lines');
    let moveY = true;

    if (currentPos.y === bluescreenContent.length) {
      Meteor.clearInterval(handle);

      if (typingSpeed > 30) {
        localStorage.setItem(TYPING_SPEED_KEY, typingSpeed - 5);
      }
    }

    const newLines = bluescreenContent.map((line, index) => {
      if (!line) {
        return line;
      }

      const lineCharacters = line.split('');

      if (index === currentPos.y) {
        if (!!lineCharacters[currentPos.x]) {
          moveY = false;
          return lineCharacters.slice(0, currentPos.x).join('');
        }
      } else if (currentPos.y < index) {
        return '';
      }

      return line;
    });

    if (moveY) {
      currentPos.y += 1;
      currentPos.x = 0;
    } else {
      currentPos.x += 1
    }

    dict.set('lines', newLines);
  }, typingSpeed);
});

Template.bluescreen.helpers({
  line() {
    return ([
      'A problem has been detected!',
      ...dict.get('lines'),
      '*** STOP: 0x00000001 (0x00222345,0x000006423,0x1231222,0xFFFFFF)',
    ]).map(line => linkify(line));
  }
});
