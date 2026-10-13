/**
 * ICONS
 * @module shared/icons
 */

//  Header Icons
import settings from "../svg/lucide/settings/settings.svg";
import sidebarClose from "../svg/lucide/sidebar/panel-left-close.svg";
import sidebarOpen from "../svg/lucide/sidebar/panel-left-open.svg";
import tabsPanel from "../svg/lucide/tabs/modified/tabs-panel.svg";
import toc from "../svg/lucide/toc/book-text.svg";

// Panel Icons
import arrowLeft from "../svg/lucide/exercises/chevron-left.svg";
import arrowRight from "../svg/lucide/exercises/chevron-right.svg";
import checkmark from "../svg/lucide/editor/check.svg";
import conversationHistory from "../svg/lucide/prompts/gallery-vertical-end.svg";
import conversationNew from "../svg/lucide/prompts/circle-plus.svg";
import copy from "../svg/lucide/editor/copy.svg";
import markComplete from "../svg/lucide/exercises/square-check-big.svg";
import markIncomplete from "../svg/lucide/exercises/rotate-ccw.svg";
import nextExercise from "../svg/lucide/exercises/arrow-big-right.svg";
import run from "../svg/lucide/editor/play.svg";
import stop from "../svg/lucide/editor/octagon-x.svg";
import viewHide from "../svg/lucide/exercises/eye-off.svg";
import viewShow from "../svg/lucide/exercises/eye.svg";

// Sidebar Icons
import archives from "../svg/lucide/sidebar/archives/archive.svg";
import bookshelf from "../svg/lucide/sidebar/bookshelf/library.svg";
import chat from "../svg/lucide/sidebar/chat-room/message-square-text.svg";
import courses from "../svg/lucide/sidebar/courses/book-open.svg";
import events from "../svg/lucide/sidebar/events/calendar-days.svg";
import exercises from "../svg/lucide/sidebar/exercises/clipboard-check.svg";
import forum from "../svg/lucide/sidebar/forums/megaphone.svg";
import modifiedLogo from "../svg/custom/modified/ls-logo.svg";
import myAccount from "../svg/lucide/sidebar/my-account/user-round.svg";
import myAssessments from "../svg/lucide/sidebar/my-assessments/shield-check.svg";
import myExercises from "../svg/lucide/sidebar/my-exercises/star-check.svg";
import page from "../svg/lucide/sidebar/pages/file.svg";
import resources from "../svg/lucide/sidebar/resources/folder-open.svg";
import sharing from "../svg/lucide/sidebar/sharing/share.svg";
import signOut from "../svg/lucide/sidebar/sign-out/log-out.svg";
import toggle from "../svg/lucide/sidebar/pages/chevron-down.svg";
import videos from "../svg/lucide/sidebar/videos/monitor-play.svg";

// Tab Icons
import community from "../svg/lucide/tabs/users-round.svg";
import feedback from "../svg/lucide/tabs/send.svg";
import instructions from "../svg/lucide/tabs/scroll.svg";
import lsbot from "../svg/lucide/tabs/bot-message-square.svg";
import review from "../svg/lucide/tabs/check-check.svg";
import code from "../svg/lucide/shared/code-xml.svg";

const parser = new DOMParser();

/**
 * Creates a factory that parses a fresh SVG element on each call.
 *
 * @param {string} icon SVG markup to parse.
 * @returns {function(): SVGElement} Factory returning a new icon element.
 */
const createIcon =
  (icon) =>
  /**
   * Parses a fresh SVG element from the markup captured by this factory.
   *
   * @returns {SVGElement} New icon element.
   */
  () =>
    createIconEl(icon);

/**
 * Parses trimmed SVG markup and returns its document element.
 *
 * @param {string} icon SVG markup to parse.
 * @returns {SVGElement} Parsed SVG icon root.
 */
const createIconEl = (icon) => parser.parseFromString(icon.trim(), "image/svg+xml").documentElement;

export const icons = {
  headerIcons: {
    settings: createIcon(settings),
    sidebarClose: createIcon(sidebarClose),
    sidebarOpen: createIcon(sidebarOpen),
    tabsPanel: createIcon(tabsPanel),
    toc: createIcon(toc),
  },
  panelIcons: {
    arrowLeft: createIcon(arrowLeft),
    arrowNext: createIcon(nextExercise),
    arrowRight: createIcon(arrowRight),
    checkmark: createIcon(checkmark),
    code: createIcon(code),
    codeRun: createIcon(run),
    codeStop: createIcon(stop),
    conversationHistory: createIcon(conversationHistory),
    conversationNew: createIcon(conversationNew),
    copy: createIcon(copy),
    exerciseComplete: createIcon(markComplete),
    exerciseIncomplete: createIcon(markIncomplete),
    viewClose: createIcon(viewShow),
    viewOpen: createIcon(viewHide),
  },
  sidebarIcons: {
    archives: createIcon(archives),
    bookshelf: createIcon(bookshelf),
    chat: createIcon(chat),
    courses: createIcon(courses),
    events: createIcon(events),
    exercises: createIcon(exercises),
    forum: createIcon(forum),
    modifiedLogo: createIcon(modifiedLogo),
    myAccount: createIcon(myAccount),
    myAssessments: createIcon(myAssessments),
    myExercises: createIcon(myExercises),
    page: createIcon(page),
    pages: createIcon(toggle),
    resources: createIcon(resources),
    sharing: createIcon(sharing),
    signOut: createIcon(signOut),
    toggle: createIcon(toggle),
    videos: createIcon(videos),
  },
  tabIcons: {
    community: createIcon(community),
    feedback: createIcon(feedback),
    instructions: createIcon(instructions),
    lsbot: createIcon(lsbot),
    review: createIcon(review),
    scratchpad: createIcon(code),
  },
};
