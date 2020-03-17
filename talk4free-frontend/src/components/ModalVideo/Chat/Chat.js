import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Chat.scss";

const Chat = props => {
  const userInfo = {
    name: props.username2,
    img: props.img
  };
  const { register, handleSubmit } = useForm();
  const [chatsDiv, setChatsDiv] = useState([]);
  const [session, setSession] = useState(null);
  // ============================================================
  const onSubmit = data => {
    const msg = data.message;
    session.signal(
      {
        type: "msg",
        data: {
          msg: msg,
          username: props.username2,
          img: props.img
        }
      },
      function(error) {
        if (error) {
          console.log("Error sending signal:", error.name, error.message);
        } else {
          console.log("Sent");
        }
      }
    );
    const msgerInput = document.getElementsByClassName("msger-input")[0];
    if (!msg) {
      return;
    }
    appendMessage(userInfo.name, userInfo.img, "right", msg);
    msgerInput.value = "";
  };
  // ============================================================
  const formatDate = date => {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
  };
  //=========================================================
  const appendMessage = (name, img, side, text) => {
    const msgerChat = document.getElementsByClassName("msger-chat")[0];

    const msgData = { name, img, side, text };

    setChatsDiv(prevArray => [...prevArray, msgData]);
    msgerChat.scrollTop += 500;
  };

  // ==============================================================================
  useEffect(() => {
    if (props.session && props.session.current) {
      setSession(props.session.current.sessionHelper.session);
    }
  }, [props.session]);
  // ==============================================================================
  useEffect(() => {
    const appendMessageL = (name, img, side, text) => {
      const msgerChat = document.getElementsByClassName("msger-chat")[0];

      const msgData = { name, img, side, text };

      console.log("ENtro a a append left");
      setChatsDiv(prevArray => [...prevArray, msgData]);
      msgerChat.scrollTop += 500;
    };

    if (session) {
      session.on("signal:msg", res => {
        const msg = res.data.msg;
        const username = res.data.username;
        const img = res.data.img;
        // If the sender username is diffrent from the actual then append
        if (username !== undefined && username !== props.username2) {
          appendMessageL(username, img, "left", msg);
        }
      });
    }
  }, [session, props.username2]);

  // ==========================================================
  const renderMessages = () => {
    return chatsDiv.map((ele, i) => {
      const side = `msg ${ele.side}-msg`;
      return (
        <div className={side}>
          <div
            className="msg-img"
            style={{ backgroundImage: `url(${ele.img})` }}
          ></div>

          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">{ele.name}</div>
              <div className="msg-info-time">{formatDate(new Date())}</div>
            </div>
            <div className="msg-text">{ele.text}</div>
          </div>
        </div>
      );
    });
  };

  // ==============================================================================
  if (session !== null) {
    return (
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt"></i> SimpleChat
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog"></i>
            </span>
          </div>
        </header>

        <main className="msger-chat">{renderMessages()}</main>

        <form className="msger-inputarea" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="msger-input"
            name="message"
            placeholder="Enter your message..."
            ref={register}
          />
          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default Chat;
