import { Template } from 'meteor/templating'

Template.home.helpers({
  personalLink() {
    return [
      {
        id: 'blog',
        label: 'Blog',
        link: 'https://matteodem.github.io/blog/',
      },
      {
        id: 'github',
        label: 'Github',
        link: 'http://bit.ly/mdm-github',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        link: 'https://www.linkedin.com/in/matteo-de-micheli-8857429a/',
      },
      {
        id: 'mastodon',
        label: 'Mastodon',
        link: 'https://mastodon.social/@matteodem',
      },
      {
        id: 'patreon',
        label: 'Patreon',
        link: 'https://www.patreon.com/matteodem',
      },
      {
        id: 'email',
        label: 'Email',
        link: 'mailto:matteo@matteodem.ch',
      },
    ]
  },
})

Router.route('/', function () {
  this.render('home')
})

Router.route('/music', function () {
  this.render('music')
})
