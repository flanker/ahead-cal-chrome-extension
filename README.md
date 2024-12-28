# AheadCal - Your Forward-Looking Calendar

Ever missed planning something because you couldn't easily see next month's dates? AheadCal solves this common frustration by showing you both current and next month at a glance.

## Key Features

* Dual-Month View: See current and next month together
* One-Click Access: Quick and easy to use
* Clean Design: No clutter, just dates you need

## Perfect For

* Planning meetings and events across months
* Setting deadlines and milestones
* Quick date checking without switching views
* Anyone who likes to plan ahead

Simple, efficient, and always ready when you need it. Install AheadCal today and make your planning easier!

## Development

This is a [Plasmo extension](https://docs.plasmo.com/) project.

### Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

### Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

### Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
