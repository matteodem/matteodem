import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

Template.content.helpers({
  isActiveClass() {
    return Session.equals('selectedApp', this.id) ? 'active' : ''
  },
  personalLink() {
    return [
      {
        id: 'blog',
        label: 'Blog',
        link: 'http://blog.matteodem.ch',
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
