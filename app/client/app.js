import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

Template.craze.helpers({
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
        id: 'twitter',
        label: 'Twitter',
        link: 'http://bit.ly/mdm-twitter',
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
