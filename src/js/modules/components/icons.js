/**
 * ICONS
 * @module components/icons
 */

import checkIcon from "../../../svg/lucide/check.svg";
// import commandIcon from "../../../svg/lucide/command.svg";
import communityIcon from "../../../svg/lucide/users-round.svg";
import copyIcon from "../../../svg/lucide/copy.svg";
import feedbackIcon from "../../../svg/lucide/send.svg";
import hideViewIcon from "../../../svg/lucide/eye-off.svg";
import instructionsIcon from "../../../svg/lucide/scroll.svg";
import lsbotIcon from "../../../svg/lucide/bot-message-square.svg";
import markCompleteIcon from "../../../svg/lucide/square-check-big.svg";
import markIncompleteIcon from "../../../svg/lucide/rotate-ccw.svg";
import newConversationIcon from "../../../svg/lucide/circle-plus.svg";
import nextExerciseIcon from "../../../svg/lucide/arrow-big-right.svg";
import panelsIcon from "../../../svg/lucide/modified/tabs-panel.svg";
import scratchpadIcon from "../../../svg/lucide/code-xml.svg";
import settingsIcon from "../../../svg/lucide/settings.svg";
import showConversationHistoryIcon from "../../../svg/lucide/gallery-vertical-end.svg";
import showViewIcon from "../../../svg/lucide/eye.svg";
import sidebarIcon from "../../../svg/lucide/panel-left.svg";
import submitReviewIcon from "../../../svg/lucide/check-check.svg";

import tocIcon from "../../../svg/lucide/book-text.svg";

import accountIcon from "../../../svg/lucide/sidebar/my-account/user-round.svg";
import announceIcon from "../../../svg/lucide/sidebar/forums/megaphone.svg";
import archiveIcon from "../../../svg/lucide/sidebar/archives/archive.svg";
import assessmentIcon from "../../../svg/lucide/sidebar/my-assessments/shield-check.svg";
import bookshelfIcon from "../../../svg/lucide/sidebar/bookshelf/library.svg";
import calendarIcon from "../../../svg/lucide/sidebar/events/calendar-days.svg";
import chatIcon from "../../../svg/lucide/sidebar/chat-room/message-square-text.svg";
import courseIcon from "../../../svg/lucide/sidebar/courses/book-open.svg";
import exercisesIcon from "../../../svg/lucide/sidebar/exercises/clipboard-check.svg";
import pagesIcon from "../../../svg/lucide/sidebar/pages/app-window-mac.svg";
import toggleIcon from "../../../svg/lucide/sidebar/pages/chevron-down.svg";
import logoutIcon from "../../../svg/lucide/sidebar/sign-out/log-out.svg";
import myExercisesIcon from "../../../svg/lucide/sidebar/my-exercises/star-check.svg";
import resourcesIcon from "../../../svg/lucide/sidebar/resources/folder-open.svg";
import shareIcon from "../../../svg/lucide/sidebar/sharing/share.svg";
import videoIcon from "../../../svg/lucide/sidebar/videos/monitor-play.svg";
import fileIcon from "../../../svg/lucide/sidebar/pages/file.svg";

import modifiedLogo from "../../../svg/custom/modified/ls-logo.svg";

const createIconEl = (icon) => {
  return new DOMParser().parseFromString(icon.trim(), "image/svg+xml").documentElement;
};

// Header Icons
export const settingsIconEl = createIconEl(settingsIcon);
export const tabsPanelIconEl = createIconEl(panelsIcon);
export const tocIconEl = createIconEl(tocIcon);

// Tab Icons
export const communityIconEl = createIconEl(communityIcon);
export const feedbackIconEl = createIconEl(feedbackIcon);
export const instructionsIconEl = createIconEl(instructionsIcon);
export const lsbotIconEl = createIconEl(lsbotIcon);
export const scratchpadIconEl = createIconEl(scratchpadIcon);
export const sidebarIconEl = createIconEl(sidebarIcon);
export const submitReviewIconEl = createIconEl(submitReviewIcon);

// Panel Icons
export const checkIconEl = createIconEl(checkIcon);
export const copyIconEl = createIconEl(copyIcon);
export const hideViewIconEl = createIconEl(hideViewIcon);
export const markCompleteIconEl = createIconEl(markCompleteIcon);
export const markIncompleteIconEl = createIconEl(markIncompleteIcon);
export const newConversationIconEl = createIconEl(newConversationIcon);
export const nextExerciseIconEl = createIconEl(nextExerciseIcon);
export const showConversationHistoryIconEl = createIconEl(showConversationHistoryIcon);
export const showViewIconEl = createIconEl(showViewIcon);

// Sidebar Header Icons
export const modifiedLogoIconEl = createIconEl(modifiedLogo);

// Sidebar List Icons
export const archiveIconEl = createIconEl(archiveIcon);
export const bookshelfIconEl = createIconEl(bookshelfIcon);
export const chatRoomIconEl = createIconEl(chatIcon);
export const coursesIconEl = createIconEl(courseIcon);
export const eventsIconEl = createIconEl(calendarIcon);
export const exercisesIconEl = createIconEl(exercisesIcon);
export const fileIconEl = createIconEl(fileIcon);
export const forumIconEl = createIconEl(announceIcon);
export const myAccountIconEl = createIconEl(accountIcon);
export const myAssessmentsIconEl = createIconEl(assessmentIcon);
export const myExercisesIconEl = createIconEl(myExercisesIcon);
export const pagesIconEl = createIconEl(pagesIcon);
export const toggleIconEl = createIconEl(toggleIcon);
export const resourcesIconEl = createIconEl(resourcesIcon);
export const sharingIconEl = createIconEl(shareIcon);
export const signOutIconEl = createIconEl(logoutIcon);
export const videosIconEl = createIconEl(videoIcon);
