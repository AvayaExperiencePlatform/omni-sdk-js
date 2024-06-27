let jwtUrl = "<jwt-server-url>"; // Example: http://localhost:3000/token if you are using the sample backend web app server from https://github.com/AvayaExperiencePlatform/omni-sdk-starter-kit

let contextParam = { "<key>": "<value>" }; // example: {"availableBalance" : "5000"}

const postbackLink = {
	fontConfig: {
		fontSize: "13px",
	},
	backgroundColor: "#cdcdcd",
	borderRadius: "5px",
	border: "none",
	activeBackgroundColor: "#bbbbbb",
	activeTextColor: "black",
};

const professionalTheme = {
	brandDetails: {
		logoSource: "https://logowik.com/content/uploads/images/avaya1980.jpg",
		fontFamily: "'Noto Sans', sans-serif",
	},

	messageBubble: {
		borderRadius: "10px",
		backgroundColor: "steelblue",
		iconSource: "neo-icon-chat",
		border: "2px solid white",
	},

	messagingWindow: {
		title: {
			fontConfig: {
				fontSize: "14px",
				fontWeight: 600,
			},
		},
		borderRadius: "10px",
		accentColor: "steelblue",
		minimizeButton: {
			show: true,
			iconSource: "neo-icon-screen-min",
		},
		notificationsButton: {
			show: true,
			iconSources: {
				noNotifications: "neo-icon-notifications-on",
				hasNotifications: "neo-icon-notifications-alerting",
				viewingNotifications: "neo-icon-notifications-on-filled",
			},
		},
	},

	brandPane: {
		brandNameFont: {
			fontSize: "0.9rem",
			fontWeight: 600,
			color: "steelblue",
		},
		banner: {
			fontConfig: {
				lineHeight: "1rem",
				fontSize: "0.7rem",
				fontWeight: 400,
			},
		},
	},

	notificationsPane: {
		paneBackground: "white",
		discardNotificationIconSource: "neo-icon-close",
		noNotificationsIconSource: "neo-icon-info",
		backgroundColors: {
			info: "#f3f9fd",
			warning: "#fffbf5",
			error: "#fef6f6",
			success: "#f1fbf1",
		},
		borderColors: {
			info: "#1b77af",
			warning: "#b35c00",
			error: "#da291c",
			success: "#088a08",
		},
		iconSources: {
			info: "neo-icon-info",
			warning: "neo-icon-warning",
			error: "neo-icon-error",
			success: "neo-icon-check",
		},
	},

	connectionStatusBar: {
		show: true,
		backgroundColors: {
			connected: "#f1fbf1",
			connecting: "#e7f4fb",
			disconnected: "#fef6f6",
		},
		fontColors: {
			connected: "#088a08",
			connecting: "#059beb",
			disconnected: "#da291c",
		},
		borderColors: {
			connected: "#088a08",
			connecting: "#059beb",
			disconnected: "#da291c",
		},
		iconSources: {
			retryConnection: "neo-icon-refresh",
			connected: "neo-icon-check",
		},
	},

	participants: {
		participantList: {
			show: true,
			iconSource: "neo-icon-user-conference",
			borderRadius: "4px",
		},

		avatarSource: {
			AGENT: {
				type: "initials",
			},
			CUSTOMER: {
				type: "initials",
				backgroundColor: "#70B517",
			},
			SUPERVISOR: {
				type: "initials",
				backgroundColor: "#256E8B",
			},
			BOT: {
				type: "bot",
				backgroundColor: "red",
			},
			SYSTEM: {
				type: "bot",
				backgroundColor: "red",
			},
		},
	},

	messages: {
		fontConfig: {
			fontSize: "small",
			fontWeight: 400,
		},

		common: {
			attachment: {
				attachmentIconSources: {
					avi: "neo-icon-file-avi",
					doc: "neo-icon-file-doc",
					jpg: "neo-icon-file-jpg",
					mp4: "neo-icon-file-mp4",
					pdf: "neo-icon-file-pdf",
					png: "neo-icon-file-png",
					txt: "neo-icon-file-txt",
					html: "neo-icon-file-html",
					json: "neo-icon-file-json",
					zip: "neo-icon-file-zip",
					ppt: "neo-icon-file-ppt",
					xls: "neo-icon-file-xls",
				},
				fallbackAttachmentIconSource: "neo-icon-file",
				downloadIconSource: "neo-icon-download",
				failedIconSource: "neo-icon-warning",
				uploadingSpinnerSource: "neo-spinner",
				fontConfig: {
					fontWeight: "bold",
				},
				attachmentSizeFont: {
					fontSize: "0.8em",
				},
			},
		},

		agent: {
			avatar: {
				show: true,
			},
			backgroundColor: "#f1f1f1",
			name: {
				show: true,
				fontConfig: {
					fontSize: "0.75rem",
					fontWeight: "bold",
					color: "rgba(0,0,0,0.9)",
				},
			},
			borderRadius: "1px 7px 7px 7px",
			time: {
				show: true,
				fontConfig: {
					fontSize: "10.5px",
					fontWeight: 400,
					color: "rgba(0,0,0,0.9)",
					textTransform: "uppercase",
				},
				format: "12-hour",
			},
			border: "none",

			composite: {
				linkButtons: postbackLink,
				postBackButtons: postbackLink,
				quickReplyButtons: postbackLink,
				locationRequest: {
					button: postbackLink,
					iconSource: "neo-icon-address",
				},
			},
			carousel: {
				nextIconSource: "neo-icon-chevron-right",
				previousIconSource: "neo-icon-chevron-left",
				linkButtons: postbackLink,
				postBackButtons: postbackLink,
				slideIndicatorColor: "#c2c2c2",
				currentSlideIndicatorColor: "#3385e9",
			},
		},

		customer: {
			avatar: {
				show: false,
			},
			backgroundColor: "#e1ecf7",
			name: {
				show: false,
				fontConfig: {
					fontSize: "0.75rem",
					fontWeight: "bold",
					color: "rgba(0,0,0,0.9)",
				},
			},
			borderRadius: "7px 1px 7px 7px",
			time: {
				show: true,
				fontConfig: {
					fontSize: "10.5px",
					fontWeight: 400,
					color: "rgba(0,0,0,0.9)",
					textTransform: "uppercase",
				},
				format: "12-hour",
			},
			border: "none",

			retrySendIconSource: "neo-icon-undo",
			statusIndicators: {
				sentSource: "neo-icon-check",
				deliveredSource: "neo-icon-message-read",
				pendingSource: "neo-spinner",
				failedSource: "neo-icon-error",
			},
		},
	},

	notifications: {
		showParticipantJoined: {
			CUSTOMER: true,
			AGENT: true,
			SUPERVISOR: true,
			SYSTEM: true,
			BOT: true,
		},
		showParticipantLeft: {
			CUSTOMER: true,
			AGENT: true,
			SUPERVISOR: true,
			SYSTEM: true,
			BOT: true,
		},
	},

	textInput: {
		fontConfig: {
			fontSize: /iPhone/i.test(navigator.userAgent) ? "16px" : "14px",
			lineHeight: 1.5,
			fontFamily:
				"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
		},
		backgroundColor: "#ffffff",
		borderRadius: "2px",
		border: "1px solid #d9d9d9",
		activeBorder: "1px solid #99c2f4",
		activeBackgroundColor: "#fff",
	},

	actionButtons: {
		sendIconSource: "neo-icon-send",
		emojiIconSource: "neo-icon-sentiment-very-happy",
		locationIconSource: "neo-icon-address",
		attachmentsIconSource: "neo-icon-attach",
	},

	attachmentMenu: {
		fileIconSource: "neo-icon-file",
		imageIconSource: "neo-icon-image",
	},

	errorBoundary: {
		iconSource: "neo-icon-warning",
		backgroundColor: "white",
	},
};

const displayStrings = {
	messagingWindow: {
		title: {
			value: "Window Title",
		},
		minimizeTooltip: {
			value: "minimize window",
			translations: {
				ja: "ウィンドウを最小化する",
			},
		},
	},
	brandPane: {
		brandName: {
			value: "Brand Name",
		},
		banner: {
			value: "We're here to talk\nSo let us know how can we help you?",
			translations: {
				en: "We're here to talk\nSo let us know how can we help you?",
				ja: "話すためにここにいます\nどのように私たちがあなたを助けることができるか教えてください?",
			},
		},
		participantsTooltip: {
			value: "participants list",
			translations: {
				ja: "参加者リスト",
			},
		},
	},
	textInput: {
		inputPrompt: {
			value: "Type here...",
			translations: {
				ja: "ここに入力してください...",
			},
		},
	},
	actions: {
		emojiTooltip: {
			value: "select emoji",
			translations: {
				ja: "絵文字を選択",
			},
		},
		attachmentTooltip: {
			value: "send attachment",
			translations: {
				ja: "添付ファイルを送る",
			},
		},
		locationTooltip: {
			value: "send current location",
			translations: {
				ja: "現在地を送る",
			},
		},
		sendMessageTooltip: {
			value: "send message",
			translations: {
				ja: "メッセージを送る",
			},
		},
	},
	toast: {
		locationUnsupported: {
			value: "Location Not Supported",
			translations: {
				ja: "位置情報はサポートされていません",
			},
		},
		locationDisabled: {
			value: "Location is Disabled",
			translations: {
				ja: "位置情報は無効です",
			},
		},
		downloadFailed: {
			value: "File Download Failed",
			translations: {
				ja: "ファイルのダウンロードに失敗しました",
			},
		},
	},
};

var axpMessagingUiConfig = {
	themeCustomizations: { professional: professionalTheme },
	defaultTheme: "professional",
	displayStrings: displayStrings,
	appKey: "<app-key>", // Application Key
	host: "<host-name>", // example: https://na.api.avayacloud.com
	integrationId: "<integration-id>", // The unique 36 character Integration ID available to your account administrator when the integration was created.
	idleTimeoutDuration: 300000, // duration in ms
	idleShutdownGraceTimeoutDuration: 30000, // duration in ms

	onIdleTimeOut: function (instance) {
		console.log("Idle timeout occurred");
	},

	onMessageBubbleClicked: function (instance) {
		console.log("Message bubble clicked");
	},

	onInit: function (instance) {
		console.log("AXP Messaging UI SDK has initialized", instance.initialized);
	},

	onShutdown: function (instance) {
		console.log("AXP Messaging UI has shut down", instance.initialized);
	},
};

// Add the axpMessagingUiConfig object to the window object
window.axpMessagingUiConfig = axpMessagingUiConfig;
