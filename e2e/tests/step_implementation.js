/* globals gauge*/
"use strict";
const path = require('path');
const {
  openBrowser,
  write,
  closeBrowser,
  goto,
  screenshot,
  click,
  text,
  textBox,
  button,
  toRightOf,
  $,
  focus,
  within,
  clear,
  evaluate
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
  await openBrowser({
    headless: headless
  })
});

afterSuite(async () => {
  await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
  const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
    `screenshot-${process.hrtime.bigint()}.png`);

  await screenshot({
    path: screenshotFilePath
  });
  return path.basename(screenshotFilePath);
};

step("Must display <message>", async function (message) {
  assert.ok(text(message).exists());
});

step("Must not display <message>", async function (message) {
  assert(!(await text(message).exists(0,0)));
});

step("Color buton must have color <color>", async function (color) {
  assert.ok(
    await evaluate($('.reminder__form__button.color'), (element) => element.style.backgroundColor === color)
  );
});

step("Go to main page", async function () {
  await goto(process.env.page_url);
});

step("Click button with name <rightElement> to the right of <leftElement>", async function (rightElement, leftElement) {
  await click(button({ name: rightElement }, toRightOf(leftElement)));
});

step("Focus on textBox with name <name>", async function (name) {
  await focus(textBox({ name: name }));
});

step("Focus on input with name <name> inside label", async function (name) {
  await focus($(`.reminder__form__label input[name=${name}]`));
});

step("Click create today", async function () {
  await click(button({ name: 'create-button' }, within($('.calendar__cell.current'))));
});

step("Write <text>", async (text) => {
  await write(text);
});

step("Click button with text <text>", async function (text) {
  await click(button(text));
});

step("Focus on element with query <query>", async function (query) {
  await focus($(query));
});

step("Click element with query <query>", async function (query) {
  await click(await $(query));
});

step("Clear text", async function () {
  await clear();
});

step("Click text <text>", async function (text) {
  await click(text);
});

step("Click input with text <text>", async function (text) {
  await click(text);
});

