let jwtUrl = '<jwt-server-url>';
let contextParam = {"<key>" : "<value>"};

const professionalTheme = {
  brandDetails: {
    logoSource:
      "https://logowik.com/content/uploads/images/avaya1980.jpg",
    fontFamily: "'Noto Sans', sans-serif",
  },

  messageBubble: {
    borderRadius: "10px",
    backgroundColor: "steelblue",
    iconSource:
      "https://static-00.iconduck.com/assets.00/chat-icon-2048x2048-i7er18st.png",
  },

  messagingWindow: {
    title: {
      fontConfig: {
        fontWeight: 600,
      },
    },
    borderRadius: "10px",
    accentColor: "steelblue",
    // backgroundColor: "aliceblue",
    minimizeButton: {
      show: true,
      // iconSource: "https://cdn1.vectorstock.com/i/1000x1000/69/85/minimize-button-dark-mode-glyph-ui-icon-vector-44906985.jpg"
    },
  },

  brandPane: {
    brandNameFont: {
      color: "steelblue",
    },
    banner: {
      value: "We're here to talk, so ask us anything!",
    },
  },

  participants: {
    participantList: {
      show: true,
      iconSource: "https://www.svgrepo.com/show/4552/user-groups.svg",
    },
  },

  avatarSource: {
    agent: "neo-icon-agents",
  },
};
const displayStrings = {
  messagingWindow: {
    title: {
      value: "Avaya Customer Support",
    },
    minimizeTooltip: {
      value: "minimize window",
      translations: {
        ja: "ウィンドウを最小化する"
      }
    }
  },
  brandPane: {
    brandName: {
      value: "Avaya Pvt Ltd",
      translations: {
        en: "Avaya Pvt Ltd",
        ja: "Avaya 私有限会社",
      },
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
        ja: "参加者リスト"
      }
    }
  },
  textInput: {
    inputPrompt: {
      value: "Type here...",
      translations: {
        ja: "ここに入力してください..."
      }
    },
  },
  actions: {
    emojiTooltip: {
      value: "select emoji",
      translations: {
        ja: "絵文字を選択"
      }
    },
    attachmentTooltip: {
      value: "send attachment",
      translations: {
        ja: "添付ファイルを送る"
      }
    },
    locationTooltip: {
      value: "send current location",
      translations: {
        ja: "現在地を送る"
      }
    },
    sendMessageTooltip: {
      value: "send message",
      translations: {
        ja: "メッセージを送る"
      }
    }
  },
  toast: {
    locationUnsupported: {
      value: "Location Not Supported",
      translations: {
        ja: "位置情報はサポートされていません"
      }
    },
    locationDisabled: {
      value: "Location is Disabled",
      translations: {
        ja: "位置情報は無効です"
      }
    },
    downloadFailed: {
      value: "File Download Failed",
      translations: {
        ja: "ファイルのダウンロードに失敗しました"
      }
    }
  }
}
var axpMessagingUiConfig = {
  themeCustomizations: {'professional': professionalTheme},
  defaultThemeProfile: 'professional',
  displayStrings: displayStrings,
  appKey: '<app-key>',
  host: '<host-name>',
  integrationId: '<integration-id>',
  idleTimeoutDuration: 300000,
  idleShutdownGraceTimeoutDuration: 30000,
  onIdleTimeOut:function(instance){
    console.log('onIdleTimeOut',instance.name);
  },
  onMessageBubbleClicked: function (instance) {
    console.log('onbubbleclicked');
  },
  onInit: function (instance) {
    console.log('onInit get name', instance.name);
  },
  onShutdown: function (instance) {
    console.log('onShutdown get intialized', instance.initialized);
  },
};

// Add the axpMessagingUiConfig object to the window object
window.axpMessagingUiConfig = axpMessagingUiConfig;