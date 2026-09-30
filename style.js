window.addEventListener('load', function() {
  setTimeout(function() {
    var style = document.createElement('style');
    style.innerHTML = `
      /* 整体背景：粉白渐变 + 星光感 */
      body:not(:has(#app.has-bg)) {
  background: linear-gradient(180deg, #FFF5F7 0%, #FCE4EC 40%, #F8D7E0 100%) !important;
}
#app:not(.has-bg) {
  background: linear-gradient(180deg, #FFF5F7 0%, #FCE4EC 40%, #F8D7E0 100%) !important;
  background-attachment: fixed !important;
}

      /* 星星点点 */
      #app::before {
        content: '';
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background-image:
          radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.8), transparent),
          radial-gradient(2px 2px at 60% 70%, rgba(255,255,255,0.7), transparent),
          radial-gradient(1px 1px at 80% 20%, rgba(255,255,255,0.9), transparent),
          radial-gradient(1.5px 1.5px at 30% 80%, rgba(255,255,255,0.7), transparent),
          radial-gradient(1px 1px at 90% 50%, rgba(255,255,255,0.6), transparent),
          radial-gradient(1.5px 1.5px at 50% 10%, rgba(255,255,255,0.7), transparent);
        pointer-events: none;
        z-index: 0;
      }

      /* 顶部栏：半透明白玻璃 */
      .header {
        background: rgba(255,255,255,0.55) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border-bottom: 1px solid rgba(255,255,255,0.6) !important;
      }
      .header-avatar {
        background: rgba(255,255,255,0.6) !important;
        border: 2px solid rgba(255,255,255,0.9) !important;
        color: #B08898 !important;
      }
      .header-name {
        color: #A86A80 !important;
      }
      .header-btn {
        background: rgba(255,255,255,0.5) !important;
        color: #A86A80 !important;
      }

      /* 消息列表区 */
      .msg-list {
        position: relative;
        z-index: 1;
      }

      /* 气泡：白玻璃 */
      .msg-item:not(.self) .bubble {
        background: rgba(255,255,255,0.65) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.8) !important;
        color: #6A4A55 !important;
        box-shadow: 0 2px 12px rgba(200,150,170,0.12) !important;
      }
      .msg-item.self .bubble {
        background: rgba(252,220,230,0.75) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border: 1px solid rgba(255,255,255,0.8) !important;
        color: #6A4A55 !important;
        box-shadow: 0 2px 12px rgba(200,150,170,0.15) !important;
      }

      /* 底部栏：白玻璃 */
      .footer {
        background: rgba(255,255,255,0.55) !important;
        backdrop-filter: blur(16px) !important;
        -webkit-backdrop-filter: blur(16px) !important;
        border-top: 1px solid rgba(255,255,255,0.6) !important;
      }
      .footer-input {
        background: rgba(255,255,255,0.7) !important;
        color: #6A4A55 !important;
      }
      .footer-input::placeholder {
        color: #C0A0B0 !important;
      }
      .footer-btn {
        background: rgba(248,200,215,0.9) !important;
        color: #fff !important;
      }
      .footer-plus, .footer-call {
        background: rgba(255,255,255,0.6) !important;
        color: #B08898 !important;
        border: 1px solid rgba(255,255,255,0.8) !important;
      }

      /* 空消息提示 */
      .empty-tip {
        color: #C0A0B0 !important;
      }

      /* 时间戳 */
      .msg-time, .msg-read {
        color: #C0A0B0 !important;
      }
    `;
    document.head.appendChild(style);
  }, 1500);
});