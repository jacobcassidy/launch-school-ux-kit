/**
 * ICONS
 * @module components/icons
 */

// Import Header Icons
import settings from "../../../svg/lucide/settings.svg";
import sidebar from "../../../svg/lucide/panel-left.svg";
import tabsPanel from "../../../svg/lucide/modified/tabs-panel.svg";
import toc from "../../../svg/lucide/book-text.svg";

// Import Panel Icons
import checkmark from "../../../svg/lucide/check.svg";
import conversationHistory from "../../../svg/lucide/gallery-vertical-end.svg";
import conversationNew from "../../../svg/lucide/circle-plus.svg";
import copy from "../../../svg/lucide/copy.svg";
import markComplete from "../../../svg/lucide/square-check-big.svg";
import markIncomplete from "../../../svg/lucide/rotate-ccw.svg";
import viewHide from "../../../svg/lucide/eye-off.svg";
import viewShow from "../../../svg/lucide/eye.svg";
import nextExercise from "../../../svg/lucide/arrow-big-right.svg";

// Import Sidebar Icons
import archives from "../../../svg/lucide/sidebar/archives/archive.svg";
import bookshelf from "../../../svg/lucide/sidebar/bookshelf/library.svg";
import chat from "../../../svg/lucide/sidebar/chat-room/message-square-text.svg";
import courses from "../../../svg/lucide/sidebar/courses/book-open.svg";
import events from "../../../svg/lucide/sidebar/events/calendar-days.svg";
import exercises from "../../../svg/lucide/sidebar/exercises/clipboard-check.svg";
import forum from "../../../svg/lucide/sidebar/forums/megaphone.svg";
import modifiedLogo from "../../../svg/custom/modified/ls-logo.svg";
import myAccount from "../../../svg/lucide/sidebar/my-account/user-round.svg";
import myAssessments from "../../../svg/lucide/sidebar/my-assessments/shield-check.svg";
import myExercises from "../../../svg/lucide/sidebar/my-exercises/star-check.svg";
import page from "../../../svg/lucide/sidebar/pages/file.svg";
import resources from "../../../svg/lucide/sidebar/resources/folder-open.svg";
import sharing from "../../../svg/lucide/sidebar/sharing/share.svg";
import signOut from "../../../svg/lucide/sidebar/sign-out/log-out.svg";
import toggle from "../../../svg/lucide/sidebar/pages/chevron-down.svg";
import videos from "../../../svg/lucide/sidebar/videos/monitor-play.svg";

// Import Tab Icons
import community from "../../../svg/lucide/users-round.svg";
import feedback from "../../../svg/lucide/send.svg";
import instructions from "../../../svg/lucide/scroll.svg";
import lsbot from "../../../svg/lucide/bot-message-square.svg";
import scratchpad from "../../../svg/lucide/code-xml.svg";
import review from "../../../svg/lucide/check-check.svg";

const parser = new DOMParser();
const createIcon = (icon) => () => createIconEl(icon);
const createIconEl = (icon) => parser.parseFromString(icon.trim(), "image/svg+xml").documentElement;

export const icons = {
  headerIcons: {
    settings: createIcon(settings),
    sidebar: createIcon(sidebar),
    tabsPanel: createIcon(tabsPanel),
    toc: createIcon(toc),
  },
  panelIcons: {
    checkmark: createIcon(checkmark),
    conversationHistory: createIcon(conversationHistory),
    conversationNew: createIcon(conversationNew),
    copy: createIcon(copy),
    markComplete: createIcon(markComplete),
    markIncomplete: createIcon(markIncomplete),
    nextExercise: createIcon(nextExercise),
    viewHide: createIcon(viewHide),
    viewShow: createIcon(viewShow),
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
    scratchpad: createIcon(scratchpad),
  },
};

// const createIcons = (icons) =>
//   Object.fromEntries(Object.entires(icons).map(([name, icon]) => [`${name}IconEl`, createIconEl(icon)]));

// Header Icons
// export const settingsIconEl = createIconEl(settingsIcon);
// export const tabsPanelIconEl = createIconEl(panelsIcon);
// export const tocIconEl = createIconEl(tocIcon);

// Tab Icons
// export const communityIconEl = createIconEl(communityIcon);
// export const feedbackIconEl = createIconEl(feedbackIcon);
// export const instructionsIconEl = createIconEl(instructionsIcon);
// export const lsbotIconEl = createIconEl(lsbotIcon);
// export const scratchpadIconEl = createIconEl(scratchpadIcon);
// export const sidebarIconEl = createIconEl(sidebarIcon);
// export const submitReviewIconEl = createIconEl(submitReviewIcon);

// Panel Icons
// export const checkIconEl = createIconEl(checkIcon);
// export const copyIconEl = createIconEl(copyIcon);
// export const hideViewIconEl = createIconEl(hideViewIcon);
// export const markCompleteIconEl = createIconEl(markCompleteIcon);
// export const markIncompleteIconEl = createIconEl(markIncompleteIcon);
// export const newConversationIconEl = createIconEl(newConversationIcon);
// export const nextExerciseIconEl = createIconEl(nextExerciseIcon);
// export const showConversationHistoryIconEl = createIconEl(showConversationHistoryIcon);
// export const showViewIconEl = createIconEl(showViewIcon);

// Sidebar Header Icons
// export const modifiedLogoIconEl = createIconEl(modifiedLogo);

// Sidebar List Icons
// export const archiveIconEl = createIconEl(archiveIcon);
// export const bookshelfIconEl = createIconEl(bookshelfIcon);
// export const chatRoomIconEl = createIconEl(chatIcon);
// export const coursesIconEl = createIconEl(courseIcon);
// export const eventsIconEl = createIconEl(calendarIcon);
// export const exercisesIconEl = createIconEl(exercisesIcon);
// export const fileIconEl = createIconEl(fileIcon);
// export const forumIconEl = createIconEl(announceIcon);
// export const myAccountIconEl = createIconEl(accountIcon);
// export const myAssessmentsIconEl = createIconEl(assessmentIcon);
// export const myExercisesIconEl = createIconEl(myExercisesIcon);
// export const pagesIconEl = createIconEl(pagesIcon);
// export const toggleIconEl = createIconEl(toggleIcon);
// export const resourcesIconEl = createIconEl(resourcesIcon);
// export const sharingIconEl = createIconEl(shareIcon);
// export const signOutIconEl = createIconEl(logoutIcon);
// export const videosIconEl = createIconEl(videoIcon);
