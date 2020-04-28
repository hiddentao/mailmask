import { getAppConfig } from './appConfig'

const { DOMAIN, SUPPORT_EMAIL, ALIAS_SENDER_EMAIL } = getAppConfig()

export const FAQ = {
  BASIC: [
    [
      'What is Mailmask?',
      `Mailmask is a service which helps you block email spam and keep your real email address private.`,
    ],
    [
      'How does Mailmask work?',
      `When you sign up for Mailmask you will set yourself a username. From then onwards, emails sent to _(anything)_\`@(your username).${DOMAIN}\` will be forwarded to your real email address.

For example, if your username is \`jim\` then emails sent to \`test@jim.${DOMAIN}\`, \`fire@jim.${DOMAIN}\`, etc will all be forwarded to your real email address.

Any time you need to give your email address to someone (e.g. when registering on a new website) you can instead give them an _alias_ address created on-the-fly, thus keeping your actual email address private.

For example, if your username is \`jim\` and you are registering on \`nytimes.com\` then you could use the alias \`nytimes@jim.${DOMAIN}\` to register. An email received at \`nytimes@jim.${DOMAIN}\` will be transparently forwarded to your email address with the sender knowing.

When you wish to stop receiving email from a particular sender you can go to your [Mailmask dashboard](/dashboard) and simply turn off that specific email alias, leaving the others enabled. Thus you can block spam or unwanted messages on a per-alias basis.`,
    ],
    [
      'How is Mailmask better than other similar services?',
      `Most virtual email address and alias services require you to pre-create the alias virtual email address prior to use. Mailmask's killer selling point is that you can create aliases on-the-fly.

No matter the scenario - whethering registering on a new website, giving your email address to a promising lead, etc. - you can simply make up an alias on-the-fly and know that all received email will arrive in your real inbox.

And when you need to turn an alias off (or back on) you can easily do so via [your Mailmask dashboard](/dashboard).

Overall, using Mailmask requires minimal effort on your part.`,
    ]
  ],

  ALIASES: [
    [
      'What are aliases?',
      `An email _alias_ is a "virtual" email address which transparently forwards all received email to your real email address.

For example, if your username is \`jim\` then all email received at \`test@jim.${DOMAIN}\` will transparently be forwarded to your email address.

Mailmask lets you create an _unlimited_ no. of aliases by simply changing the prefix (the bit before the \`@\`).

For example, if your username is \`jim\` then \`an_alias@jim.${DOMAIN}\`, \`something_random@jim.${DOMAIN}\`, etc wil all transparently foward received email to your real email address.`
    ],
    [
      'How do I create a new alias?',
      `Once you have registered with Mailmask and chosen your username, you can create a new email alias on-the-fly by sending an email to it. The alias will then show up in [your dashboard](/dashboard).

For example, if your username is \`jim\` and you wish to create \`test@jim.${DOMAIN}\` then just have an email sent to \`test@jim.${DOMAIN}\`.`,
    ],
    [
      'Where can I see all my created aliases?',
      `All aliases can be seen and managed via [your dashboard](/dashboard).`,
    ],
    [
      'How do turn off an alias, i.e. stop receiving email through it?',
      `You can turn an alias off via [your dashboard](/dashboard).

Please note that once an alias is turned off we thereafter silently discard all email received through it. So please be sure that you want to turn an alias off.`,
    ],
    [
      'Will senders know that I\'ve turned off an alias that they are currently sending to?',
      `When an alias is turned off Mailmask will silently drop all the emails received at that alias **without notifying the senders**. Thus the senders will not know that the alias is turned off.

This is by design and is intended as a security measure for your benefit.`
    ],
    [
      'How do I turn an alias back on, i.e. resume receiving email through it?',
      `You can turn an alias back on via [your dashboard](/dashboard).

Please note that once an alias is turned off we thereafter silently discard all email received through it.

Thus, when you turn the alias back on you will not be able to catch up on the emails you missed in the intervening period. You will just receive new emails from now onwards.`
    ]
  ],

  PRIVACY: [
    [
      'Will a sender know that I am using Mailmask?',
      `Unless a sender already knows that the \`${DOMAIN}\` domain represents the Mailmask service there is no other way for them to know that you are using Mailmask. From their point of view, the alias address you have given them is no different to a normal email address.

Note that when you _reply_ to an email received via Mailmask the reply will appear to come from your real email address, not the Mailmask alias that they sent to.

(We are in the process of developing a _reply-via-alias_ feature, please stay tuned!)`,
    ],
    [
      'Will senders be able to find out my real email address?',
      `It is not possible for a sender to find out your real email address from your Mailmask address without guessing.

However, if you _reply_ to a sender note that the replies will come from your real email address, not the Mailmask alias.

(We are in the process of developing a _reply-via-alias_ feature, please stay tuned!)`,
    ],
    [
      'Is my email address still private when I reply to an email?',
      `At present, when you reply to a sender the reply will come from your real email address, not the Mailmask alias. So please be careful when replying.

(We are in the process of developing a _reply-via-alias_ feature, please stay tuned!)`,
    ],
    [
      'Does Mailmask scan or store my email?',
      `We do not ever scan your email content for any purposes. In terms of storage, we wonly store your email in our mailer's outbound sending queue, from which it is gets removed as soon as it gets forwarded to you.`,
    ],
    [
      'How does Mailmask use my data?',
      `We do not store or mine any of your email data for information. We do use analytics tracking cookies on our website to help us improve our website experience for end-users, and thus we do track this information.

Please see our [privacy policy](/privacy) for more details.`,
    ],
  ],

  LIMITS: [
    [
      'How many aliases can I create in total?',
      `There is **no limit** to the number of aliases you can create. For real.`,
    ],
    [
      'Are there limits to the no. of email I can receive?',
      `To ensure a fair service for all users we limit you to receiving a maximum of 30 emails per minute **across all your aliases combined**. It's highly unlikely you will exceed this limit unless you're receiving certain types of automated emails (e.g. spam, build server reports, etc)

Please note that any emails received over the limit will be silently discarded, but we will send you a separate email to notify you that this has occured.`,
    ],
  ],

  ACCOUNT: [
    [
      'How do I delete my account?',
      `If you are sure you want to delete your account you can do so via [the dashboard](/dashboard). Please note that we are unable to restore your account to its previous state once deleted.`,
    ],
  ],

  TROUBLESHOOTING: [
    [
      'I did not get the signup or login email :/',
      `Please check your spam folder for any messages sent from **${SUPPORT_EMAIL}**. We recommend that you add this sender address to your "no spam" list.`,
    ],
    [
      'I did not receiving an email that was sent to one of my alias addresses :/',
      `Please check your spam folder for any messages sent from **${ALIAS_SENDER_EMAIL}**. We recommend that you add this sender address to your "no spam" list.`,
    ],
    [
      'I couldn\'t find an answer to my question, please help!',
      `No problem! visit our [help and support](/help) page to find out how you can get in touch with us.`,
    ],
  ],

  SUBSCRIPTIONS: [
    [
      'Is Mailmask free? How much does it cost?',
      `We offer a 30-day FREE trial period to start off with, no credit card needed. After the 30 days have ended you must opt for one of our paid plans to continue using the service.

Please see our [pricing page](/pricing) for more details.`,
    ],
    [
      'How long does the free trial last for?',
      `The trial period is 30 days.`,
    ],
    [
      'When will I have to pay?',
      `We will email you shortly before your free trial is due to end, and again after it has ended, prompting you to sign up for a paid plan in order to continue using Mailmask.`,
    ],
    [
      'Will I lose access to my account once my trial ends?',
      `Not at all! You will always be able to login to your account and view your dashboard. However, your email aliases will temporarily not work until you sign up for a paid plan.`,
    ],
    [
      'If I delay in signing up for a paid plan will I receive the backlog of emails I missed?',
      `For security and privacy reasons we do not store or log email content. Thus, if you delay in signing up for a paid plan after your trial has ended you may miss out on any emails received in the intervening period.`,
    ],
    [
      'How do I cancel?',
      `You can cancel your subscription via the [dashboard](/dashboard). Your email aliases will continue to work until your subscription's original renewal date.

To cancel your trial, simply delete your account via the dashboard.`,
    ],
    [
      'If I cancel my paid subscription at any point can I get a refund?',
      `Unfortunately all payments are non-refundable.`,
    ]
  ],
}

FAQ.TRIAL_COLUMN_1 = [
  FAQ.SUBSCRIPTIONS[2],
  FAQ.SUBSCRIPTIONS[3],
]

FAQ.TRIAL_COLUMN_2 = [
  FAQ.SUBSCRIPTIONS[4],
  FAQ.SUBSCRIPTIONS[5],
]

