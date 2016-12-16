import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { _ } from 'meteor/underscore'

const dict = new ReactiveDict('app')

const link = (href, text) => `<a href="${href}" style="color: white">${text}</a>`

const TYPING_SPEED_KEY = 'matteodem-typingspeed'
const typingSpeed = localStorage.getItem(TYPING_SPEED_KEY) || 43

const linkify = str => {
  if (!str) {
    return str
  }

  const links = str.match(/\([\/:\s\w\-\.\?]+\|>[\s\w\-]+\)/g)

  if (links) {
    links.forEach(linkDesc => {
      const linkDescWithBraces = linkDesc
      const descParts = linkDesc.split('')

      descParts.splice(-1, 1)
      descParts.splice(0, 1)

      linkDesc = descParts.join('')

      const parts = linkDesc.split('|>')
      str = str.replace(linkDescWithBraces, link(parts[0], parts[1]))
    })
  }

  return str
}

const doings = [
  'drinking coffee',
  'buying a random energy drink from the grocery store',
  'vividly recalling what he ate for lunch',
]

const bluescreenContent = [
  '',
  'matteodem hacked your browser.',
  '',
  '',
  '',
  `he was last seen ${doings[_.random(0, doings.length - 1)]} nearby your hometown.`, // TODO: randomize this text
  '(/?restarted |> Restart your computer)',
  '',
  '',
]

dict.set('lines', (new Array(bluescreenContent.length)))

Template.bluescreen.onCreated(() => {
  const currentPos = { x: 0, y: 0 }

  const handle = Meteor.setInterval(() => {
    const lines = dict.get('lines')
    let moveY = true

    if (currentPos.y === bluescreenContent.length) {
      Meteor.clearInterval(handle)

      if (typingSpeed > 30) {
        localStorage.setItem(TYPING_SPEED_KEY, typingSpeed - 5)
      }
    }

    const newLines = bluescreenContent.map((line, index) => {
      if (!line) {
        return line
      }

      const lineCharacters = line.split('')

      if (index === currentPos.y) {
        if (!!lineCharacters[currentPos.x]) {
          moveY = false
          return lineCharacters.slice(0, currentPos.x).join('')
        }
      } else if (currentPos.y < index) {
        return ''
      }

      return line
    })

    if (moveY) {
      currentPos.y += 1
      currentPos.x = 0
    } else {
      currentPos.x += 1
    }

    dict.set('lines', newLines)
  }, typingSpeed - 10)
})

Template.bluescreen.helpers({
  line() {
    return ([
      'A problem has been detected!',
      ...dict.get('lines'),
      '*** STOP: 0x00000001 (0x00222345,0x000006423,0x1231222,0xFFFFFF)',
    ]).map(line => linkify(line))
  }
})

Template.craze.helpers({
  restarted() {
    return window.location.search === '?restarted'
  },
})

Template.desktop.helpers({
  isActiveClass() {
    return Session.equals('selectedApp', this.id) ? 'active' : ''
  },
  desktopApp() {
    return [
      {
        id: 'github',
        label: 'Github',
        icon: 'http://i.imgur.com/zlDnNBv.png',
        link: 'http://bit.ly/mdm-github',
      },
      {
        id: 'twitter',
        label: 'Twitter',
        icon: 'http://i.imgur.com/bdZzrMC.png',
        link: 'http://bit.ly/mdm-twitter',
      },
      {
        id: 'email',
        label: 'Email',
        icon: 'http://imgur.com/mvuO3fD.jpg',
        link: 'mailto:matteo@matteodem.ch',
      },
      {
        id: 'secret-passwords',
        label: 'Top Secret!!',
        icon: 'http://i.imgur.com/4KnasCJ.jpg',
        onclick() {
          const width = $(window).width() - 200
          const height = $(window).height() - 400

          let topOffset = 50
          let leftOffset = 50
          let round = 0

          const handle = setInterval(function () {
            topOffset = (Math.random() * width)
            leftOffset = (Math.random() * height)
            round += 1

            $('body').append(`
            <div
                class="error-popup"
                style="font-size: 40px; border: 3px solid #222; padding: 40px 50px; width: 400px; background-color: rgb(230, 50, 50); position: fixed; top: ${topOffset}px; left: ${leftOffset}px">
              Error while opening secret file!
            </div>
            `)

            if (round > 80)  {
              clearInterval(handle)
              $('.error-popup').remove()
              window.location.href = '/'
            }
          }, 70)
        }
      }
    ]
  },
})

Template.desktop.events({
  'click .app'() {
    Session.set('selectedApp', this.id)
  },
  'dblclick .app'() {
    this.onclick ? this.onclick() : window.open(this.link)
    Session.set('selectedApp', null)
  }
})
