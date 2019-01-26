<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling" />
  </div>
</template>

<script>
export default {

  data() {
    return {
      participants: [
        {
          id: 'user1',
          name: 'Kazuo',
          imageUrl: 'https://cdn.peraichi.com/userData/5728664c-3390-4d30-98e9-44d30a00005c/img/5a434856c7d03/original.jpg'
        },
        {
          id: 'user2',
          name: 'マリオ',
          imageUrl: 'https://www.nintendo.co.jp/switch/adala/files/img/main/chara_mario.png'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://pbs.twimg.com/profile_images/586460110400000004/BSsAcQdw_reasonably_small.png',
      messageList: [
          { type: 'text', author: `me`, data: { text: `まだ時間あるよ` } },
          { type: 'text', author: `user1`, data: { text: `人多い` } }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    }
  }
}
</script>

<style>
.sc-header--img {
    border-radius: 50%;
    -ms-flex-item-align: center;
    align-self: center;
    padding: 10px;
    max-width: 50px;
    max-height: 50px;
}
/* .sc-message--avatar {
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    min-width: 30px;
    min-height: 30px;
    border-radius: 50%;
    -ms-flex-item-align: center;
    align-self: center;
    margin-right: 15px;
} */
</style>