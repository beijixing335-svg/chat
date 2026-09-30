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

      .qta-result-card {
        background: #fff; border-radius: 16px;
        padding: 16px; margin: 10px auto;
        border: 1px solid #e0e0e0;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        width: 90%; max-width: 320px;
      }
      .qta-card-title {
        font-size: 16px; font-weight: 600; color: #000;
        text-align: center; margin-bottom: 10px; line-height: 1.4;
      }
      .qta-card-answer-status {
        font-size: 14px; color: #333;
        text-align: center; margin-bottom: 5px;
      }
      .qta-card-answer-status span {
        color: #4CAF50; margin-right: 4px; font-weight: bold;
      }
      .qta-card-collect {
        display: block; background: #f5f5f5;
        border-radius: 20px; padding: 4px 12px;
        font-size: 12px; color: #666;
        margin: 0 auto 10px auto;
        cursor: pointer; border: none; text-align: center;
      }
      .qta-card-time {
        font-size: 12px; color: #999;
        text-align: center; margin-bottom: 15px;
        padding-bottom: 15px; border-bottom: 1px dashed #e0e0e0;
      }
      .qta-card-options { display: flex; flex-direction: column; gap: 8px; }
      .qta-card-option {
        padding: 12px 15px; border-radius: 12px;
        border: 1px solid #e0e0e0;
        font-size: 14px; color: #333;
        background: #fff; text-align: left;
      }
      .qta-card-option.selected {
        border-color: #000; font-weight: 600;
        box-shadow: 0 0 0 1px #000;
      }

      /* 自定义菜单项（插入到 + 号菜单里） */
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

      /* 设置面板里的字卡分组按钮 */
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

      /* 字卡分组弹窗 */
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
          <div class="qta-title">问问TA</div>
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

    // 弹窗控制
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
        setTimeout(() => insertQuestionnaireCard(questionInput, selectedOptions, options), thinkTime * 1000);
      } else if (currentMode === 'multiple') {
        const shuffled = [...options].sort(() => 0.5 - Math.random());
        const count = Math.min(Math.floor(Math.random() * maxSelect) + 1, options.length);
        selectedOptions = shuffled.slice(0, count);
        setTimeout(() => insertQuestionnaireCard(questionInput, selectedOptions, options), thinkTime * 1000);
      }
    });

    function insertQuestionnaireCard(question, selectedOptions, allOptions) {
      let optionsHtml = '';
      allOptions.forEach(opt => {
        const isSelected = selectedOptions.includes(opt);
        optionsHtml += `<div class="qta-card-option ${isSelected ? 'selected' : ''}">${opt}</div>`;
      });
      const cardHtml = `
        <div class="qta-result-card">
          <div class="qta-card-title">问问TA · ${question}</div>
          <div class="qta-card-answer-status"><span>✓</span> TA：${selectedOptions.join('、')}</div>
          <button class="qta-card-collect">♥ 收藏</button>
          <div class="qta-card-time">${new Date().toLocaleTimeString('zh-CN', { hour12: false })} 发送</div>
          <div class="qta-card-options">${optionsHtml}</div>
        </div>
      `;
      const msgContainer = document.getElementById('msgList');
      if (msgContainer) {
        const wrapper = document.createElement('div');
        wrapper.className = 'msg-item';
        wrapper.style.justifyContent = 'center';
        wrapper.innerHTML = cardHtml;
        msgContainer.appendChild(wrapper);
        msgContainer.scrollTop = msgContainer.scrollHeight;
        wrapper.querySelector('.qta-card-collect').addEventListener('click', function() {
          this.innerHTML = '♥ 已收藏'; this.style.color = '#000';
        });
      }
    }

    // ===== 关键：把按钮挂到原界面里 =====

    // 1) 把「问问TA」挂到 + 号菜单
    function hookPlusMenu() {
      var plusMenu = document.getElementById('plusMenu');
      if (!plusMenu) { setTimeout(hookPlusMenu, 500); return; }
      // 检查是否已经加过，避免重复
      if (document.getElementById('custom-qta-item')) return;
      var item = document.createElement('button');
      item.className = 'custom-plus-item menu-item';
      item.id = 'custom-qta-item';
      item.innerHTML = '❓ 问问TA';
      item.addEventListener('click', function() {
        plusMenu.classList.remove('active');
        qtaOverlay.classList.add('active');
      });
      plusMenu.appendChild(item);
    }

    // 2) 把「字卡分组」挂到设置里的「字卡管理」区域
    function hookSettingsPanel() {
      // 找设置面板里的「字卡管理」标题
      var panel = document.querySelector('.settings-panel');
      if (!panel) { setTimeout(hookSettingsPanel, 500); return; }
      if (document.getElementById('setting-cg-entry')) return;

      // 找到「📚 字卡管理」那块 setting-group
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

      // 插到「字卡管理」标题的下面
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
});