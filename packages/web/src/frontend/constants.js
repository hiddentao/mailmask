import { calculateEmailsForBandwidthMb, toPrettyNumberString, SUB } from '@mailmask/utils'

import { getAppConfig } from './appConfig'

const { DOMAIN } = getAppConfig()

const bandwidthStr = (val, inclStr = true) => {
  const r = toPrettyNumberString(calculateEmailsForBandwidthMb(val), { maximumSignificantDigits: 2 })

  return `~${r}${inclStr ? ' [average-sized emails](http://answers.google.com/answers/threadview?id=312463)' : ''}`
}

export const DASHBOARD = {
  PANELS: {
    main: 'My aliases',
    plan: 'My plan',
    account: 'My account',
  }
}


export const FAQ = {
  BASIC: [
    [
      'What is Mailmask?',
      `Mailmask is a service which lets you create an unlimited no. of temporary email addresses, all of which automatically foward emails to your real email address.

Mailmask additionally lets you to turn each of these temporary email adresss on or off whenever you like.`,
    ],
    [
      'Why would I want to use Mailmask?',
      `Temporary email addresses are a great way to:

1. Protect your real email address by keeping it private.
2. Stop spam from entering your inbox.

By allowing you to create unlimited temporary email addresses, Mailmask allows you to provide a unique email address for every person or online service you interact with.

Later on, if you wish to stop receiving email from a particular individual, company or online service you can simply disable the dispoable email address you created for them, leaving all the others intact.

In effect you now have fine-grained control over who gets to send you email, all without ever having to reveal your real email address!`
    ],
    [
      'How does Mailmask work?',
      `When you sign up for Mailmask you will set yourself a username. From then onwards, emails sent to **\`(anything)@(your username).${DOMAIN}\`** will be forwarded to your real email address.

For example, if your username is **\`jim\`** then emails sent to **\`test@jim.${DOMAIN}\`**, **\`fire@jim.${DOMAIN}\`**, etc will all be forwarded to your real email address.

Any time you need to give your email address to someone (e.g. when registering on a new website) you can instead give them an _alias_ address created on-the-fly, thus keeping your actual email address private.

For example, if your username is **\`jim\`** and you are registering on **\`nytimes.com\`** then you could use the alias **\`nytimes@jim.${DOMAIN}\`** to register. An email received at **\`nytimes@jim.${DOMAIN}\`** will be transparently forwarded to your email address with the sender knowing.

When you wish to stop receiving email from a particular sender you can go to your [Mailmask dashboard](/dashboard) and simply turn off that specific email alias, leaving the others enabled. Thus you can block spam or unwanted messages on a per-alias basis.`,
    ],
    [
      'How is Mailmask better than other temporary/disposable email services?',
      `Most other similar services require you to pre-create the alias address prior to use.

They often provide browser extensions to automate this process, though can never be as flexible as Mailmask which lets you create aliases without needing any additional sofware.

And indeed, this is Mailmask's _killer_ usability point - that **you can create aliases on-the-fly**.

Because Mailmask fowards all received email to your real email address you can keep using your existing mail client to read your email, unlike other services which require you to use their website.

When you need to turn an alias off (or back on) you can easily do so via [your Mailmask dashboard](/dashboard). Most other services do not offer this feature since their aliases are very short-lived in the first place.
`,
    ],
    [
      'Can I use Mailmask for my personal and/or professional email?',
      `Yes, you can use it for any type of email.

Our system is engineered to handle any type of email (including large attachments) so there are no limitations to the kinds of email communcation you can use it with.

We also don't store or scan any of your content on our servers so confidentiality is assured.`,
    ]
  ],

  ALIASES: [
    [
      'What is an alias?',
      `In Mailmask, an _alias_ is another name for a temporary email address which transparently forwards all received email to your real email address.

For example, if your username is **\`jim\`** then all email received at **\`test@jim.${DOMAIN}\`** will transparently be forwarded to your real email address.

Mailmask lets you create an _unlimited_ no. of aliases by simply changing the prefix (the bit before the **\`@**).

For example, if your username is **\`jim\`** then **\`an_alias@jim.${DOMAIN}\`**, **\`something_random@jim.${DOMAIN}\`**, etc wil all transparently foward received email to your real email address.`
    ],
    [
      'How do I create a new alias?',
      `Once you have registered with Mailmask and chosen your username, you can create a new email alias on-the-fly when you need to give someone your email address.

For example, if your username is **\`jim\`** and you are registering on **\`nytimes.com\`** then you could use the alias **\`nytimes@jim.${DOMAIN}\`** to register. An email received at **\`nytimes@jim.${DOMAIN}\`** will be transparently forwarded to your email address with the sender knowing.

If/when they send you an email Mailmask will automatically forward the messages to your real email address and the alias used will show up in [your dashboard](/dashboard).

To test this process out simply send an email to **\`test@(your username).${DOMAIN}\`** and then check that the **\`test\`** alias appears in the dashboard.`
    ],
    [
      'Where can I see all my created aliases?',
      `All aliases can be seen and managed in [your dashboard](/dashboard).`,
    ],
    [
      'How long are aliases valid for?',
      `All created aliases are valid forever.

To disable an alias, simply turn it off via [your dashboard](/dashboard) - any subsequent email received through that alias will be silently discarded.`
    ],
    [
      'How do delete an alias, i.e. stop receiving email through it?',
      `You can turn an alias off via [your dashboard](/dashboard).

Please note that once an alias is turned off we thereafter silently discard all email received through it without notifying you any further. So please be sure that you want to turn an alias off.`,
    ],
    [
      'How do I restore an alias, i.e. resume receiving email through it?',
      `You can turn an alias back on via [your dashboard](/dashboard).

Please note that once an alias is turned off we thereafter silently discard all email received through it. Thus, when you turn it back on you will not be able to catch up on the emails you missed in the intervening period.`
    ]
  ],

  PRIVACY: [
    [
      'Does my real email address truly remain private?',
      `Yes! It is not possible for a sender to find out your real email address from your Mailmask address without guessing.

When you _reply_ to an email received via Mailmask the reply will come from your real email address, which the sender would then be able to see.

To keep your real email address private even when replying, please sign up for one of our [paid plans](/pricing).`,
    ],
    [
      'Will a sender know that I am using Mailmask?',
      `Unless a sender already knows that the **\`${DOMAIN}\`** domain represents the Mailmask service there is no other way for them to know that you are using Mailmask. From their point of view, the alias address you give them is the same as any other email address.

Note however, that when you _reply_ to an email received via Mailmask the reply will come from your real email address, not the Mailmask alias that they sent to.

To keep your real email address private even when replying, please sign up for one of our [paid plans](/pricing).`,
    ],
    [
      'Is my email address still private when I reply to an email?',
      `When you reply to a sender the reply will come from your real email address, not the Mailmask alias.

To keep your real email address private even when replying, please sign up for one of our [paid plans](/pricing).`,
    ],
    [
      'Will senders know that I\'ve turned off an alias that they are currently sending to?',
      `When an alias is turned off Mailmask will silently drop all the emails received at that alias **without notifying the senders**. Thus the senders will not know that the alias is turned off.

This is by design and is intended as a security measure for your benefit.`
    ],
    [
      'Does Mailmask scan or store my email?',
      `We don't ever scan your email content for any purposes. In terms of storage, we only store your email in our system's outbound _sending queue_, from which it is gets removed as soon as it gets forwarded to you.`,
    ],
    [
      'How does Mailmask use my data?',
      `We do not store or mine any of your email data for information. And we do not add tracking information to your emails.

We do use analytics tracking cookies on our website to help us improve our website experience.

Please see our [privacy policy](/privacy) for more details.`,
    ],
  ],

  LIMITS: [
    [
      'Are the aliases really unlimited?',
      `Yes! there is **no limit** to the number of aliases you can create. For real.`,
    ],
    [
      'Are there limits to the number of emails I can receive?',
      `There is no limit to the number of emails you can receive.

However, to ensure a fair service for all users we limit the amount of network bandwidth every user has access to.

Network bandwidth is a measure of the total amount of email data (text, attachments, etc) we forward to you within a given calendar month through your various aliases.

On the free Basic plan, we grant ${SUB.BANDWIDTH.BASIC} MB of bandwidth per calendar month. This equates to receiving ${bandwidthStr(SUB.BANDWIDTH.BASIC)} per calendar month.

On the [paid plans](/pricing) we grant hundreds of MB of bandwidth per month, which equates to **several thousand** emails.`
    ],
  ],

  BANDWIDTH: [
    [
      'What is the monthly bandwidth limit?',
      `The monthly bandwidth limit is a measure of the maximum amount of email data (text, attachments, etc) we will forward to you within a given calendar month through your various aliases.

The bandwidth limit exists to ensure a fair service for all of our users. Your bandwidth usage data gets reset at the start of every calendar month.

On the free Basic plan, we grant ${SUB.BANDWIDTH.BASIC} MB of bandwidth per calendar month.This equates to receiving ~170[average - sized emails](http://answers.google.com/answers/threadview?id=312463) in a single month.

On the [paid plans](/pricing) we grant hundreds of MB of bandwidth per month, which equates to **several thousand** emails.`
    ],
    [
      'How is bandwidth usage calculated?',
      `The bandwidth usage for a given calendar month is calculated as sum total email data (html, text, attachments) forwarded to you via _all_ your Mailmask aliases from the beginning of the month until the end of that month inclusive.`,
    ],
    [
      'Where can I see my bandwidth usage data?',
      `You can see the bandwidth used so far in the current calendar month by visiting the [your plan page](/dashboard/plan).

On [paid plans](/pricing) you will also be able to view the bandwidth used per alias.`,
    ],
    [
      'Do blocked emails / disabled aliases count towards my bandwidth usage?',
      `No. Only emails which are forwarded to your real email address count towards your bandwidth usage.

If you turn an alias off in your dashboard, future emails received at that alias (which do not then get forwarded to you) do NOT count towards your bandwidth usage.`
    ],
    [
      'What happens if I exceed my monthly bandwidth limit?',
      `If you exceed your monthly bandwidth limit we will notify you by email, asking you to upgrade to a payment plan which has a higher monthly bandwidth limit.

Your email aliases will automatically stop working (i.e. we will not foward any received email) until either you upgrade your payment plan, or until the start of the next calendar month.`,
    ],
  ],

  SUBSCRIPTIONS: [
    [
      'Is Mailmask free? How much does it cost?',
      `Our _Basic_ plan is free forever. In addition we offer paid plans for power users who wish to make use of our full set of features.

All our plans can be seen on the [pricing page](/pricing).`,
    ],
    [
      'Will I ever be asked to upgrade my plan?',
      `We will only ask you to switch to a paid plan or upgrade to a more expensive plan if you exceed your monthly bandwidth limit (please see the FAQ _Monthly bandwidth_ section for more information).`,
    ],
    [
      'How do I upgrade to a better plan?',
      `Goto [your plan page](/dashboard/plan) and select the plan you wish to upgrade to.`,
    ],
    [
      'Can I downgrade to the free or a cheaper plan?',
      `Yes! Goto [your plan page](/dashboard/plan) and select the plan you wish to downgrade to.

When downgrading we will keep you your original plan until its next renewal date, after which you will automatically be downgraded to your newly chosen plan.`,
    ],
    [
      'How do I cancel my subscription?',
      `To cancel a paid subscription but keep using Mailmask, goto your [plan page](/dashboard/plan) and downgrade to the _Basic_ free plan.

If you wish to completely delete your Mailmask account this can be done from your [account page](/dashboard/account).`,
    ],
    [
      'If I cancel my paid subscription will I get a refund for unused time?',
      `Unfortunately all payments are non-refundable.`,
    ],
    [
      'Is my payment data safe with  you?',
      `We use [paddle.com](https://paddle.com) is the payment processor as well as merchant of record for all transactions. They are fully GDPR-compliant and handle your card details - we never see or store these details ourselves.`,
    ],
    [
      'How will payments appear in my credit card statement?',
      `Since we use [paddle.com](https://paddle.com) to process payments, so transactions might show up on your statement as **\`PADDLE.NEXT *MAILMASK**. If you paid using Paypal the transaction may appear to be for **\`Paddle.com Market Limited**.`,
    ],
    [
      'If I fail to make a subscription payment what will happen?',
      `We will inform you in [the dashboard](/dashboard) that your payment failed and attempt to take payment again a few days later.

You will also receive an email informing you of the failed payment.

If the second attempt to take payment also fails your subscription will automatically be cancelled.`
    ]
  ],


  PLANS: [
    [
      'Is the Basic plan free forever?',
      `Yes!`,
    ],
    [
      'What does the Premium plan offer?',
      `The _Premium_ plan offers everything the _Basic_ plan does, with the following improvements:

* **A higher _Monthly bandwidth_ limit of ${SUB.BANDWIDTH.PREMIUM} MB.**

This equates to ${bandwidthStr(SUB.BANDWIDTH.PREMIUM)}, as opposed to ${bandwidthStr(SUB.BANDWIDTH.BASIC, false)} on the _Basic_ plan.

* **Advanced dashboard statistics.**

For each alias see stats for the current month such as how many emails were received and how much bandwidth was used. On
the _Basic_ plan we do not display per-alias statistics.
`,
    ],

    [
      'What does the Pro plan offer?',
      `The _Pro_ plan offers everything the _Premium_ plan does, with the following improvements:

* **A higher _Monthly bandwidth_ limit of ${SUB.BANDWIDTH.PRO} MB.**

This equates to ${bandwidthStr(SUB.BANDWIDTH.PRO)}, as opposed to ${bandwidthStr(SUB.BANDWIDTH.PREMIUM, false)} on the _Premium_ plan.

* **Private replies.**

Reply to emails received via your aliases without revealing your real email address. Unlike the _Basic_ plan your privacy
is assured even when replying.

* **Manage multiple inboxes in one account.**

What if you want to use Mailmask with your other email addresses, such as your work address? Instead of registering
a new Mailmask account and new subscription for them you can add them to your existing account and manage everything in one.
`,
    ],
  ],


  ACCOUNT: [
    [
      'How do I delete my account?',
      `If you are sure you want to delete your account you can do so via [your account page](/dashboard/account).d

This will also automatically cancel any paid subscription you have with us.

Please note, we are unable to restore your account to its previous state once deleted.`,
    ],
  ],

  TROUBLESHOOTING: [
    [
      'I did not get the signup or login email :/',
      `Please check your spam folder for any messages sent from the **\`${DOMAIN}\`** domain. We recommend that you setup your spam filter to allow any and all messages from **\`${DOMAIN}\`** through.`,
    ],
    [
      'I did not receiving an email that was sent to one of my alias addresses :/',
      `Please check your spam folder for any messages sent from the **\`${DOMAIN}\`** domain. We recommend that you setup your spam filter to allow any and all messages from **\`${DOMAIN}\`** through.`,
    ],
    [
      'I couldn\'t find an answer to my question, please help!',
      `No problem! visit our [help and support](/help) page to find out how you can get in touch with us.`,
    ],
  ],

}

FAQ.TRIAL_COLUMN_1 = [
  FAQ.PLANS[0],
  FAQ.BANDWIDTH[1],
  FAQ.BANDWIDTH[3],
]

FAQ.TRIAL_COLUMN_2 = [
  FAQ.SUBSCRIPTIONS[3],
  FAQ.SUBSCRIPTIONS[4],
  FAQ.TROUBLESHOOTING[2],
]

