window.addEventListener('load', function() {
  setTimeout(function() {
    // 1. 注入 CSS 样式
    const style = document.createElement('style');
    style.innerHTML = `
      #qta-float-btn { display: none !important; }
      #cg-float-btn { display: none !important; }

      .qta-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4);
        display: none; align-items: center; justify-content: center;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .qta-overlay.active { display: flex; }

      .qta-modal {
        width: 90%; max-width: 380px;
        background: #fff; border-radius: 20px;
        padding: 20px; box-sizing: border-box;
        display: flex; flex-direction: column;
        max-height: 85vh; overflow-y: auto;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        animation: qtaFadeIn 0.25s ease-out;
      }
      @keyframes qtaFadeIn {
        from { opacity: 0; transform: translateY(10px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .qta-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 15px; position: relative;
      }
      .qta-title {
        font-size: 18px; font-weight: 600; color: #000;
        width: 100%; text-align: center;
      }
      .qta-close {
        position: absolute; right: 0; top: 50%;
        transform: translateY(-50%);
        width: 30px; height: 30px;
        background: #f5f5f5; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; color: #999;
        cursor: pointer; user-select: none;
      }

      .qta-input, .qta-textarea {
        width: 100%; padding: 12px 15px;
        background: #f5f5f5; border: 1px solid #e0e0e0;
        border-radius: 12px; font-size: 14px;
        box-sizing: border-box; outline: none;
        color: #333; margin-bottom: 12px; resize: none;
      }
      .qta-input::placeholder, .qta-textarea::placeholder { color: #999; }
      .qta-textarea { height: 90px; line-height: 1.5; }

      #qta-options-wrapper {
        display: block; margin-bottom: 12px; position: relative;
      }
      .qta-clear-btn {
        position: absolute; right: 10px; top: 50%;
        transform: translateY(-50%);
        width: 24px; height: 24px;
        background: #e0e0e0; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; color: #666;
        cursor: pointer; user-select: none;
      }

      .qta-mode-group { display: flex; gap: 10px; margin-bottom: 15px; }
      .qta-mode-btn {
        flex: 1; padding: 10px 0;
        background: #f5f5f5; border: none; border-radius: 12px;
        font-size: 14px; color: #333;
        cursor: pointer; text-align: center; transition: all 0.2s;
      }
      .qta-mode-btn.active { background: #000; color: #fff; }

      .qta-hint {
        font-size: 12px; color: #999;
        margin-top: -8px; margin-bottom: 12px; line-height: 1.4;
      }

      .qta-row {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 15px; padding-bottom: 15px;
        border-bottom: 1px solid #f0f0f0;
      }
      .qta-row:last-of-type { border-bottom: none; margin-bottom: 10px; }
      .qta-row-label { font-size: 14px; color: #333; }
      
      .qta-stepper { display: flex; align-items: center; gap: 10px; }
      .qta-stepper-btn {
        width: 36px; height: 36px;
        background: #f5f5f5; border: none; border-radius: 8px;
        font-size: 20px; color: #333;
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; user-select: none;
      }
      .qta-stepper-btn:active { background: #e0e0e0; }
      .qta-stepper-val { font-size: 16px; font-weight: 600; min-width: 30px; text-align: center; }

      .qta-bottom-row { display: flex; gap: 12px; margin-top: 5px; }
      .qta-btn {
        flex: 1; padding: 12px; border: none; border-radius: 12px;
        font-size: 16px; font-weight: 600; cursor: pointer;
      }
      .qta-btn-cancel { background: #f5f5f5; color: #333; }
      .qta-btn-cancel:active { background: #e0e0e0; }
      .qta-btn-send { background: #000; color: #fff; }
      .qta-btn-send:active { opacity: 0.8; }

      .custom-plus-item {
        padding: 10px 20px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        border: none;
        background: transparent;
        width: 100%;
        text-align: left;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .custom-plus-item:active { background: #f0f0f0; }

      .setting-cg-entry {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
        color: #333;
      }
      .setting-cg-entry .btn {
        padding: 6px 14px;
        border: none;
        border-radius: 8px;
        background: #000;
        color: #fff;
        font-size: 13px;
        cursor: pointer;
      }

      #cg-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.4);
        display: none; align-items: center; justify-content: center;
        z-index: 10002;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      #cg-overlay.active { display: flex; }

      .cg-modal {
        width: 90%; max-width: 400px;
        background: #fff; border-radius: 20px;
        padding: 20px; box-sizing: border-box;
        display: flex; flex-direction: column;
        max-height: 85vh;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        animation: cgFadeIn 0.25s ease-out;
      }
      @keyframes cgFadeIn {
        from { opacity: 0; transform: translateY(10px) scale(0.98); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      .cg-header {
        display: flex; align-items: center; justify-content: space-between;
        margin-bottom: 15px; position: relative;
      }
      .cg-title {
        font-size: 18px; font-weight: 600; color: #000;
        width: 100%; text-align: center;
      }
      .cg-close {
        position: absolute; right: 0; top: 50%;
        transform: translateY(-50%);
        width: 30px; height: 30px;
        background: #f5f5f5; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 16px; color: #999;
        cursor: pointer; user-select: none;
      }

      .cg-group-list {
        flex: 1; overflow-y: auto;
        margin-bottom: 15px; max-height: 40vh; padding-right: 5px;
      }
      .cg-group-item {
        display: flex; align-items: center; justify-content: space-between;
        padding: 12px 15px; background: #f9f9f9;
        border-radius: 12px; margin-bottom: 10px;
        border: 1px solid transparent;
      }
      .cg-group-item.active { border-color: #000; background: #fff; }
      .cg-group-name {
        font-size: 15px; font-weight: 500; color: #333;
        flex: 1; margin-right: 10px;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        cursor: pointer;
      }
      .cg-group-actions { display: flex; gap: 10px; }
      .cg-btn-icon {
        width: 32px; height: 32px;
        background: #fff; border: 1px solid #e0e0e0;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 14px; color: #333;
        cursor: pointer; user-select: none;
      }
      .cg-btn-icon:active { background: #f0f0f0; }

      .cg-bottom { display: flex; flex-direction: column; gap: 10px; }
      .cg-new-group-row { display: flex; gap: 10px; }
      .cg-input {
        flex: 1; padding: 12px 15px;
        background: #f5f5f5; border: 1px solid #e0e0e0;
        border-radius: 12px; font-size: 14px;
        box-sizing: border-box; outline: none; color: #333;
      }
      .cg-input::placeholder { color: #999; }
      
      .cg-btn {
        padding: 12px 20px; border: none; border-radius: 12px;
        font-size: 15px; font-weight: 600;
        cursor: pointer; text-align: center;
      }
      .cg-btn-black { background: #000; color: #fff; }
      .cg-btn-black:active { opacity: 0.8; }
      .cg-btn-gray { background: #f5f5f5; color: #333; }
      .cg-btn-gray:active { background: #e0e0e0; }
      
      #cg-card-select-overlay {
        position: fixed; top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        display: none; align-items: center; justify-content: center;
        z-index: 10003;
      }
      #cg-card-select-overlay.active { display: flex; }
      .cg-card-select-modal {
        width: 90%; max-width: 400px;
        background: #fff; border-radius: 20px;
        padding: 20px;
        display: flex; flex-direction: column; max-height: 80vh;
      }
      .cg-card-select-list {
        flex: 1; overflow-y: auto; margin-bottom: 15px;
        display: flex; flex-direction: column; gap: 8px;
      }
      .cg-card-checkbox {
        display: flex; align-items: center;
        padding: 12px; background: #f9f9f9;
        border-radius: 10px; cursor: pointer;
        border: 1px solid transparent;
      }
      .cg-card-checkbox.selected { border-color: #000; background: #fff; }
      .cg-card-checkbox input {
        margin-right: 10px; width: 18px; height: 18px;
        accent-color: #000;
      }
      .cg-card-text {
        font-size: 14px; color: #333; flex: 1;
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      }
    `;
    document.head.appendChild(style);

    // 2. 弹窗 HTML
    const qtaOverlay = document.createElement('div');
    qtaOverlay.className = 'qta-overlay';
    qtaOverlay.id = 'qta-overlay';
    qtaOverlay.innerHTML = `
      <div class="qta-modal">
        <div class="qta-header">
          <div class="qta-title">问问Shanks</div>
          <div class="qta-close" id="qta-close">✕</div>
        </div>
        <input type="text" class="qta-input" id="qta-question" placeholder="你的问题？">
        <div class="qta-mode-group" id="qta-mode-group">
          <button class="qta-mode-btn active" data-mode="single">单选题</button>
          <button class="qta-mode-btn" data-mode="multiple">多选题</button>
        </div>
        <div id="qta-options-wrapper">
          <textarea class="qta-textarea" id="qta-options-input" placeholder="请输入选项，每行一个"></textarea>
          <div class="qta-clear-btn" id="qta-options-clear">✕</div>
        </div>
        <div class="qta-hint" id="qta-options-hint">单选题选项：每行一个</div>
        <div class="qta-row">
          <span class="qta-row-label">思考时间（秒）</span>
          <div class="qta-stepper">
            <button class="qta-stepper-btn" id="qta-time-minus">-</button>
            <span class="qta-stepper-val" id="qta-time-val">8</span>
            <button class="qta-stepper-btn" id="qta-time-plus">+</button>
          </div>
        </div>
        <div class="qta-row" id="qta-max-select-row" style="display: none;">
          <span class="qta-row-label">最多选几个</span>
          <div class="qta-stepper">
            <button class="qta-stepper-btn" id="qta-max-minus">-</button>
            <span class="qta-stepper-val" id="qta-max-val">3</span>
            <button class="qta-stepper-btn" id="qta-max-plus">+</button>
          </div>
        </div>
        <div class="qta-bottom-row">
          <button class="qta-btn qta-btn-cancel" id="qta-cancel">取消</button>
          <button class="qta-btn qta-btn-send" id="qta-send">发送</button>
        </div>
      </div>
    `;
    document.body.appendChild(qtaOverlay);

    const cgOverlay = document.createElement('div');
    cgOverlay.id = 'cg-overlay';
    cgOverlay.innerHTML = `
      <div class="cg-modal">
        <div class="cg-header">
          <div class="cg-title">字卡分组管理</div>
          <div class="cg-close" id="cg-close">✕</div>
        </div>
        <div class="cg-group-list" id="cg-group-list"></div>
        <div class="cg-bottom">
          <div class="cg-new-group-row">
            <input type="text" class="cg-input" id="cg-new-group-name" placeholder="新建分组名称...">
            <button class="cg-btn cg-btn-black" id="cg-add-group-btn">新建</button>
          </div>
          <button class="cg-btn cg-btn-gray" id="cg-save-btn">保存分组配置</button>
        </div>
      </div>
    `;
    document.body.appendChild(cgOverlay);

    const cardSelectOverlay = document.createElement('div');
    cardSelectOverlay.id = 'cg-card-select-overlay';
    cardSelectOverlay.innerHTML = `
      <div class="cg-card-select-modal">
        <div class="cg-header">
          <div class="cg-title" id="cg-select-title">选择字卡</div>
          <div class="cg-close" id="cg-select-close">✕</div>
        </div>
        <div class="cg-card-select-list" id="cg-card-select-list"></div>
        <button class="cg-btn cg-btn-black" id="cg-select-confirm">确定添加</button>
      </div>
    `;
    document.body.appendChild(cardSelectOverlay);

    // 3. 逻辑
    let currentMode = 'single';
    let thinkTime = 8;
    let maxSelect = 3;
    let cardGroups = {};
    let currentGroupName = null;

    if (!data.questionnaire) {
      data.questionnaire = { question: '', options: [], mode: 'single', thinkTime: 8, maxSelect: 3 };
    } else {
      currentMode = data.questionnaire.mode || 'single';
      if (currentMode === 'text') currentMode = 'single';
      thinkTime = data.questionnaire.thinkTime || 8;
      maxSelect = data.questionnaire.maxSelect || 3;
      document.getElementById('qta-question').value = data.questionnaire.question || '';
      document.getElementById('qta-time-val').innerText = thinkTime;
      document.getElementById('qta-max-val').innerText = maxSelect;
      if (data.questionnaire.options && data.questionnaire.options.length > 0) {
        document.getElementById('qta-options-input').value = data.questionnaire.options.join('\n');
      }
      updateModeUI();
    }

    if (!data.cardGroups) data.cardGroups = {};
    cardGroups = JSON.parse(JSON.stringify(data.cardGroups));

    function renderGroupList() {
      const listEl = document.getElementById('cg-group-list');
      listEl.innerHTML = '';
      const groupNames = Object.keys(cardGroups);
      if (groupNames.length === 0) {
        listEl.innerHTML = '<div style="text-align:center; color:#999; font-size:14px; padding:20px 0;">暂无分组，请新建一个</div>';
        return;
      }
      groupNames.forEach(name => {
        const item = document.createElement('div');
        item.className = 'cg-group-item';
        item.innerHTML = `
          <div class="cg-group-name">${name} <span style="font-size:12px; color:#999;">(${cardGroups[name].length})</span></div>
          <div class="cg-group-actions">
            <div class="cg-btn-icon cg-add-card" title="添加字卡">+</div>
            <div class="cg-btn-icon cg-del-group" title="删除分组">✕</div>
          </div>
        `;
        item.querySelector('.cg-group-name').addEventListener('click', () => {
          currentGroupName = name; openCardSelect(name);
        });
        item.querySelector('.cg-add-card').addEventListener('click', (e) => {
          e.stopPropagation(); currentGroupName = name; openCardSelect(name);
        });
        item.querySelector('.cg-del-group').addEventListener('click', (e) => {
          e.stopPropagation();
          if (confirm(`确定要删除分组「${name}」吗？`)) {
            delete cardGroups[name];
            data.cardGroups = JSON.parse(JSON.stringify(cardGroups));
            saveData(); renderGroupList();
          }
        });
        listEl.appendChild(item);
      });
    }

    function openCardSelect(groupName) {
      document.getElementById('cg-select-title').innerText = `选择字卡加入「${groupName}」`;
      const listEl = document.getElementById('cg-card-select-list');
      listEl.innerHTML = '';
      if (!data.cards || data.cards.length === 0) {
        listEl.innerHTML = '<div style="text-align:center; color:#999; font-size:14px; padding:20px 0;">当前没有字卡数据</div>';
        cardSelectOverlay.classList.add('active');
        return;
      }
      const existingCards = cardGroups[groupName] || [];
      data.cards.forEach(cardText => {
        const isSelected = existingCards.includes(cardText);
        const item = document.createElement('label');
        item.className = `cg-card-checkbox ${isSelected ? 'selected' : ''}`;
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; checkbox.checked = isSelected; checkbox.value = cardText;
        checkbox.addEventListener('change', function() { item.classList.toggle('selected', this.checked); });
        const textSpan = document.createElement('span');
        textSpan.className = 'cg-card-text'; textSpan.innerText = cardText;
        item.appendChild(checkbox); item.appendChild(textSpan);
        listEl.appendChild(item);
      });
      cardSelectOverlay.classList.add('active');
    }

    document.getElementById('qta-close').addEventListener('click', () => qtaOverlay.classList.remove('active'));
    document.getElementById('qta-cancel').addEventListener('click', () => qtaOverlay.classList.remove('active'));
    qtaOverlay.addEventListener('click', (e) => { if (e.target === qtaOverlay) qtaOverlay.classList.remove('active'); });

    document.getElementById('cg-close').addEventListener('click', () => cgOverlay.classList.remove('active'));
    cgOverlay.addEventListener('click', (e) => { if (e.target === cgOverlay) cgOverlay.classList.remove('active'); });
    document.getElementById('cg-select-close').addEventListener('click', () => cardSelectOverlay.classList.remove('active'));
    cardSelectOverlay.addEventListener('click', (e) => { if (e.target === cardSelectOverlay) cardSelectOverlay.classList.remove('active'); });

    document.getElementById('cg-add-group-btn').addEventListener('click', () => {
      const nameInput = document.getElementById('cg-new-group-name');
      const name = nameInput.value.trim();
      if (!name) { alert('请输入分组名称'); return; }
      if (cardGroups[name]) { alert('该分组已存在'); return; }
      cardGroups[name] = [];
      data.cardGroups = JSON.parse(JSON.stringify(cardGroups));
      nameInput.value = ''; saveData(); renderGroupList();
    });

    document.getElementById('cg-select-confirm').addEventListener('click', () => {
      if (!currentGroupName) return;
      const selectedCards = [];
      document.querySelectorAll('#cg-card-select-list input[type="checkbox"]:checked').forEach(cb => {
        selectedCards.push(cb.value);
      });
      cardGroups[currentGroupName] = selectedCards;
      data.cardGroups = JSON.parse(JSON.stringify(cardGroups));
      saveData(); cardSelectOverlay.classList.remove('active'); renderGroupList();
    });

    document.getElementById('cg-save-btn').addEventListener('click', () => {
      data.cardGroups = JSON.parse(JSON.stringify(cardGroups));
      saveData(); alert('分组配置已保存'); cgOverlay.classList.remove('active');
    });

    document.getElementById('qta-mode-group').addEventListener('click', (e) => {
      const btn = e.target.closest('.qta-mode-btn');
      if (!btn) return;
      currentMode = btn.dataset.mode; updateModeUI();
    });

    function updateModeUI() {
      document.querySelectorAll('.qta-mode-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.mode === currentMode);
      });
      const optionsHint = document.getElementById('qta-options-hint');
      const maxSelectRow = document.getElementById('qta-max-select-row');
      if (currentMode === 'multiple') {
        maxSelectRow.style.display = 'flex';
        optionsHint.innerText = '多选题选项：每行一个';
      } else {
        maxSelectRow.style.display = 'none';
        optionsHint.innerText = '单选题选项：每行一个';
      }
    }

    document.getElementById('qta-options-clear').addEventListener('click', () => {
      document.getElementById('qta-options-input').value = '';
    });
    document.getElementById('qta-time-minus').addEventListener('click', () => {
      if (thinkTime > 1) { thinkTime--; document.getElementById('qta-time-val').innerText = thinkTime; }
    });
    document.getElementById('qta-time-plus').addEventListener('click', () => {
      thinkTime++; document.getElementById('qta-time-val').innerText = thinkTime;
    });
    document.getElementById('qta-max-minus').addEventListener('click', () => {
      if (maxSelect > 1) { maxSelect--; document.getElementById('qta-max-val').innerText = maxSelect; }
    });
    document.getElementById('qta-max-plus').addEventListener('click', () => {
      maxSelect++; document.getElementById('qta-max-val').innerText = maxSelect;
    });

    // ===== 问卷发送 =====
    document.getElementById('qta-send').addEventListener('click', () => {
      const questionInput = document.getElementById('qta-question').value.trim() || '（空问题）';
      const optionsInput = document.getElementById('qta-options-input').value.trim();
      data.questionnaire.question = questionInput;
      data.questionnaire.mode = currentMode;
      data.questionnaire.thinkTime = thinkTime;
      data.questionnaire.maxSelect = maxSelect;
      let options = [];
      if (optionsInput) {
        options = optionsInput.split('\n').map(s => s.trim()).filter(s => s);
      }
      data.questionnaire.options = options;
      saveData();
      qtaOverlay.classList.remove('active');
      addMessage(questionInput, true, null, null);

      let selectedOptions = [];
      if (options.length === 0) {
        setTimeout(() => enqueueReply('（未设置选项）', thinkTime, null), 0);
      } else if (currentMode === 'single') {
        selectedOptions = [options[Math.floor(Math.random() * options.length)]];
        setTimeout(() => {
          addMessage('📋 问问Shanks · ' + questionInput + '\nShanks：' + selectedOptions.join('、'), false, null, null);
        }, thinkTime * 1000);
      } else if (currentMode === 'multiple') {
        const shuffled = [...options].sort(() => 0.5 - Math.random());
        const count = Math.min(Math.floor(Math.random() * maxSelect) + 1, options.length);
        selectedOptions = shuffled.slice(0, count);
        setTimeout(() => {
          addMessage('📋 问问Shanks · ' + questionInput + '\nShanks：' + selectedOptions.join('、'), false, null, null);
        }, thinkTime * 1000);
      }
    });

    // ===== 把按钮挂到原界面 =====
    function hookPlusMenu() {
      var plusMenu = document.getElementById('plusMenu');
      if (!plusMenu) { setTimeout(hookPlusMenu, 500); return; }
      if (document.getElementById('custom-qta-item')) return;
      var item = document.createElement('button');
      item.className = 'custom-plus-item menu-item';
      item.id = 'custom-qta-item';
      item.innerHTML = '🍶 问问Shanks';
      item.addEventListener('click', function() {
        plusMenu.classList.remove('active');
        qtaOverlay.classList.add('active');
      });
      plusMenu.appendChild(item);
    }

    function hookSettingsPanel() {
      var panel = document.querySelector('.settings-panel');
      if (!panel) { setTimeout(hookSettingsPanel, 500); return; }
      if (document.getElementById('setting-cg-entry')) return;
      var groups = panel.querySelectorAll('.setting-group');
      var targetGroup = null;
      groups.forEach(function(g) {
        var label = g.querySelector('.setting-group-label');
        if (label && label.innerText.indexOf('字卡管理') !== -1) {
          targetGroup = g;
        }
      });
      if (!targetGroup) { setTimeout(hookSettingsPanel, 500); return; }
      var entry = document.createElement('div');
      entry.className = 'setting-cg-entry';
      entry.id = 'setting-cg-entry';
      entry.innerHTML = '<span>📁 字卡分组管理</span><button class="btn">打开</button>';
      entry.querySelector('.btn').addEventListener('click', function() {
        renderGroupList();
        cgOverlay.classList.add('active');
      });
      var label = targetGroup.querySelector('.setting-group-label');
      if (label && label.nextSibling) {
        targetGroup.insertBefore(entry, label.nextSibling);
      } else {
        targetGroup.appendChild(entry);
      }
    }

    hookPlusMenu();
    hookSettingsPanel();

  }, 1000);
});// ====== 隐藏旧设置项，加自定义 CSS 输入框 ======
(function() {
  var timer = setInterval(function() {
    var panel = document.querySelector('.settings-panel');
    if (!panel) return;
    var groups = panel.querySelectorAll('.setting-group');
    if (groups.length === 0) return;

    if (document.getElementById('custom-css-section')) {
      clearInterval(timer);
      return;
    }

    // 隐藏「界面主题」「气泡样式」「气泡颜色」
    groups.forEach(function(g) {
      var label = g.querySelector('.setting-group-label');
      if (!label) return;
      var txt = label.innerText || '';
      if (txt.indexOf('界面主题') !== -1 ||
          txt.indexOf('气泡样式') !== -1 ||
          txt.indexOf('气泡颜色') !== -1) {
        g.style.display = 'none';
      }
    });

    // 找「聊天字体」分组，在它后面插自定义样式区
    var anchorGroup = null;
    groups.forEach(function(g) {
      var label = g.querySelector('.setting-group-label');
      if (label && (label.innerText || '').indexOf('聊天字体') !== -1) {
        anchorGroup = g;
      }
    });
    if (!anchorGroup) return;

    var section = document.createElement('div');
    section.className = 'setting-group';
    section.id = 'custom-css-section';
    section.innerHTML = `
      <div class="setting-group-label">🎨 自定义气泡样式</div>
      <div style="font-size:12px;color:#999;margin-bottom:6px;">粘贴 CSS 代码，点应用即可生效</div>
      <textarea id="custom-css-input" style="width:100%;height:120px;padding:8px 10px;border:1px solid #ddd;border-radius:8px;font-size:12px;resize:vertical;outline:none;font-family:monospace;box-sizing:border-box;" placeholder="在这里粘贴 CSS 代码..."></textarea>
      <div style="display:flex;gap:8px;margin-top:8px;">
        <button id="custom-css-apply" style="flex:1;padding:8px;border:none;border-radius:8px;background:#000;color:#fff;font-size:13px;cursor:pointer;">应用</button>
        <button id="custom-css-reset" style="flex:1;padding:8px;border:none;border-radius:8px;background:#f0f0f0;color:#333;font-size:13px;cursor:pointer;">恢复默认</button>
      </div>
    `;
    anchorGroup.parentNode.insertBefore(section, anchorGroup.nextSibling);

    var styleEl = document.createElement('style');
    styleEl.id = 'custom-css-style';
    document.head.appendChild(styleEl);

    var input = document.getElementById('custom-css-input');
    var applyBtn = document.getElementById('custom-css-apply');
    var resetBtn = document.getElementById('custom-css-reset');

    function applyCustomCSS(css) {
      document.getElementById('custom-css-style').innerHTML = css || '';
      if (window.data) {
        window.data.customCSS = css || '';
        if (typeof saveData === 'function') saveData();
      }
    }

    if (window.data && window.data.customCSS) {
      input.value = window.data.customCSS;
      applyCustomCSS(window.data.customCSS);
    }

    applyBtn.addEventListener('click', function() {
      applyCustomCSS(input.value);
      alert('已应用');
    });
    resetBtn.addEventListener('click', function() {
      input.value = '';
      applyCustomCSS('');
      alert('已恢复');
    });

    clearInterval(timer);
  }, 800);
})();// ====== 主动发消息 + 弹通知 ======
(function() {
  var timer = setInterval(function() {
    var panel = document.querySelector('.settings-panel');
    if (!panel) return;
    var groups = panel.querySelectorAll('.setting-group');
    if (groups.length === 0) return;
    if (document.getElementById('active-msg-section')) {
      clearInterval(timer);
      return;
    }

    var anchorGroup = null;
    groups.forEach(function(g) {
      var label = g.querySelector('.setting-group-label');
      if (label && (label.innerText || '').indexOf('表情包频率') !== -1) {
        anchorGroup = g;
      }
    });
    if (!anchorGroup) return;

    if (!window.data) return;
    if (typeof window.data.activeMsgEnabled === 'undefined') {
      window.data.activeMsgEnabled = false;
      window.data.activeMsgInterval = 300;
      window.data.notifyEnabled = false;
    }

    var section = document.createElement('div');
    section.className = 'setting-group';
    section.id = 'active-msg-section';
    section.innerHTML = `
      <div class="setting-group-label">🪽 主动发消息</div>
      <div style="display:flex;align-items:center;gap:8px;padding:4px 0;">
        <label style="font-size:13px;color:#555;min-width:60px;">开关</label>
        <input type="checkbox" id="active-msg-toggle" style="width:20px;height:20px;accent-color:#000;">
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:4px 0;">
        <label style="font-size:13px;color:#555;min-width:60px;">间隔</label>
        <input type="range" id="active-msg-interval" min="5" max="30" value="5" step="1" style="flex:1;">
        <span id="active-msg-val" style="font-size:14px;font-weight:600;min-width:50px;text-align:center;">5分</span>
      </div>
      <div style="font-size:11px;color:#999;margin-top:2px;">开启后，每隔这个时间对方主动发一条消息（网页挂后台有效）</div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 0 4px 0;">
        <label style="font-size:13px;color:#555;min-width:60px;">通知</label>
        <input type="checkbox" id="notify-toggle" style="width:20px;height:20px;accent-color:#000;">
      </div>
      <div style="font-size:11px;color:#999;">开启后，对方发消息时弹出系统通知</div>
    `;
    anchorGroup.parentNode.insertBefore(section, anchorGroup.nextSibling);

    var toggle = document.getElementById('active-msg-toggle');
    var slider = document.getElementById('active-msg-interval');
    var valSpan = document.getElementById('active-msg-val');
    var notifyToggle = document.getElementById('notify-toggle');

    toggle.checked = window.data.activeMsgEnabled;
    var initMin = Math.round((window.data.activeMsgInterval || 300) / 60);
    if (initMin < 5) initMin = 5;
    if (initMin > 30) initMin = 30;
    slider.value = initMin;
    valSpan.innerText = initMin + '分';
    notifyToggle.checked = window.data.notifyEnabled;

    function save() {
      if (typeof saveData === 'function') saveData();
    }

    toggle.addEventListener('change', function() {
      window.data.activeMsgEnabled = this.checked;
      save();
    });
    slider.addEventListener('input', function() {
      var min = parseInt(this.value);
      valSpan.innerText = min + '分';
      window.data.activeMsgInterval = min * 60;
      save();
    });

    notifyToggle.addEventListener('change', function() {
      var self = this;
      if (self.checked) {
        if (!('Notification' in window)) {
          alert('此浏览器不支持通知');
          self.checked = false;
          return;
        }
        if (Notification.permission === 'granted') {
          window.data.notifyEnabled = true;
          new Notification('🪽 通知已开启', { body: '之后对方发消息时会弹通知' });
          save();
        } else if (Notification.permission === 'denied') {
          alert('通知权限被拒绝，请到浏览器设置里手动开启');
          self.checked = false;
        } else {
          Notification.requestPermission().then(function(p) {
            if (p === 'granted') {
              window.data.notifyEnabled = true;
              new Notification('🪽 通知已开启', { body: '之后对方发消息时会弹通知' });
            } else {
              self.checked = false;
              window.data.notifyEnabled = false;
            }
            save();
          });
        }
      } else {
        window.data.notifyEnabled = false;
        save();
      }
    });

    clearInterval(timer);
  }, 800);

  // ===== 定时检查 =====
  setInterval(function() {
    if (!window.data || !window.data.activeMsgEnabled) return;
    if (!window.data.cards || window.data.cards.length === 0) return;
    if (typeof addMessage !== 'function') return;

    var now = Date.now();
    if (!window.data.lastActiveMsgTime) {
      window.data.lastActiveMsgTime = now;
      if (typeof saveData === 'function') saveData();
      return;
    }
    var interval = (window.data.activeMsgInterval || 300) * 1000;
    if (now - window.data.lastActiveMsgTime >= interval) {
      window.data.lastActiveMsgTime = now;
      if (typeof saveData === 'function') saveData();
      var card = window.data.cards[Math.floor(Math.random() * window.data.cards.length)];
      addMessage(card, false, null, null);

      // 弹通知
      if (window.data.notifyEnabled && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification('🪽 ' + (window.data.otherName || 'TA'), {
            body: card,
            icon: 'icon.png'
          });
        } catch(e) {}
      }
    }
  }, 5000);
})();