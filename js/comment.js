//AKfycbwieprSpS1GdvbESaTF2IFmUzh0ZbcLO3cGYe_5gQT762EJa4waD2G96wODSv45JVCW
// comment.js - Comment System with Scrollable Comments Only
const COMMENT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwieprSpS1GdvbESaTF2IFmUzh0ZbcLO3cGYe_5gQT762EJa4waD2G96wODSv45JVCW/exec';

let currentHairstyleId = null;
let commentsData = {};
let isCommentSectionVisible = false;
let closeButtonAnimationInterval = null;

// Load all comments in background on page load
async function loadAllCommentsInBackground() {
    try {
        console.log('🔄 Loading all comments in background...');
        
        // Load comments for all hairstyles
        for (const hairstyle of hairstyles) {
            if (!commentsData[hairstyle.id]) {
                await loadCommentsFromSheet(hairstyle.id);
            }
        }
        
        console.log('✅ All comments loaded in background');
    } catch (error) {
        console.error('❌ Error loading comments in background:', error);
    }
}

// Load comments from Google Sheets
async function loadCommentsFromSheet(hairstyleId) {
    try {
        console.log('📥 Loading comments for hairstyle:', hairstyleId);
        const response = await fetch(`${COMMENT_SCRIPT_URL}?action=getComments&hairstyleId=${hairstyleId}`);
        
        if (!response.ok) throw new Error('Network error');
        
        const data = await response.json();
        
        if (data.success && data.data && data.data.comments) {
            commentsData[hairstyleId] = data.data.comments;
            console.log(`✅ Loaded ${data.data.comments.length} comments for hairstyle ${hairstyleId}`);
            return true;
        }
    } catch (error) {
        console.error('❌ Error loading comments:', error);
    }
    return false;
}

// Get client IP address
async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip || 'Unknown';
    } catch (error) {
        return 'Unknown';
    }
}

// Submit comment to Google Sheets
async function submitCommentToSheet(hairstyleId, commentText, userName = 'Anonymous') {
    try {
        console.log('📤 Submitting comment for hairstyle:', hairstyleId);
        
        const ipAddress = await getClientIP();
        
        const formData = new URLSearchParams();
        formData.append('action', 'submitComment');
        formData.append('hairstyleId', hairstyleId);
        formData.append('comment', commentText);
        formData.append('userName', userName);
        formData.append('ipAddress', ipAddress);
        
        const response = await fetch(COMMENT_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        });
        
        if (!response.ok) throw new Error('Network error');
        
        const result = await response.json();
        
        if (result.success) {
            console.log('✅ Comment submitted successfully');
            
            // Add to local comments data
            if (!commentsData[hairstyleId]) {
                commentsData[hairstyleId] = [];
            }
            
            const newComment = {
                userName: userName,
                comment: commentText,
                timestamp: new Date().toISOString(),
                hairstyleId: hairstyleId,
                ipAddress: ipAddress
            };
            
            commentsData[hairstyleId].unshift(newComment);
            
            return { success: true, message: '💬 ကျေးဇူးတင်ပါသည်! သင့်မှတ်ချက်ကို မှတ်တမ်းတင်ပြီးပါပြီ။' };
        } else {
            throw new Error(result.error || 'Server rejected the comment');
        }
    } catch (error) {
        console.error('❌ Error submitting comment:', error);
        return { success: false, message: '❌ မှတ်ချက်မှတ်တမ်းတင်ရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်။' };
    }
}

// Generate comments HTML
function generateCommentsHTML(hairstyleId) {
    const comments = commentsData[hairstyleId] || [];
    
    if (comments.length === 0) {
        return `
            <div class="no-comments">
                <i class="fas fa-comment-slash"></i>
                <p>မှတ်ချက်မရှိသေးပါ</p>
                <p class="no-comments-sub">ပထမဆုံးမှတ်ချက်ရေးသားသူဖြစ်လာပါ</p>
            </div>
        `;
    }
    
    return comments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-user">${escapeHtml(comment.userName)}</span>
                <span class="comment-time">${formatTimeAgo(comment.timestamp)}</span>
            </div>
            <div class="comment-text">${escapeHtml(comment.comment)}</div>
        </div>
    `).join('');
}

// Format time ago
function formatTimeAgo(timestamp) {
    const now = new Date();
    const commentTime = new Date(timestamp);
    const diffMs = now - commentTime;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'ယခုအတွင်း';
    if (diffMins < 60) return `${diffMins} မိနစ်က`;
    if (diffHours < 24) return `${diffHours} နာရီက`;
    if (diffDays < 7) return `${diffDays} ရက်က`;
    
    return commentTime.toLocaleDateString('my-MM');
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Start close button animation
function startCloseButtonAnimation() {
    const closeBtn = document.getElementById('closeCommentsBtn');
    if (!closeBtn) return;
    
    // Clear existing interval
    if (closeButtonAnimationInterval) {
        clearInterval(closeButtonAnimationInterval);
    }
    
    // Start new interval - pulse every 3 seconds
    closeButtonAnimationInterval = setInterval(() => {
        closeBtn.classList.add('pulse-animation');
        setTimeout(() => {
            closeBtn.classList.remove('pulse-animation');
        }, 1000);
    }, 2000);
}

// Stop close button animation
function stopCloseButtonAnimation() {
    if (closeButtonAnimationInterval) {
        clearInterval(closeButtonAnimationInterval);
        closeButtonAnimationInterval = null;
    }
    
    const closeBtn = document.getElementById('closeCommentsBtn');
    if (closeBtn) {
        closeBtn.classList.remove('pulse-animation');
    }
}

// Toggle comment section visibility
function toggleCommentSection() {
    const commentSection = document.getElementById('commentSection');
    const ratingSection = document.querySelector('.rating-section');
    const hairstyleDetails = document.querySelector('.hairstyle-details');
    const toggleCommentBtn = document.getElementById('toggleCommentBtn');
    
    if (!commentSection) return;
    
    isCommentSectionVisible = !isCommentSectionVisible;
    
    if (isCommentSectionVisible) {
        // Show comment section, hide rating section and details
        commentSection.style.display = 'flex';
        if (ratingSection) ratingSection.style.display = 'none';
        if (hairstyleDetails) hairstyleDetails.style.display = 'none';
        if (toggleCommentBtn) {
            toggleCommentBtn.innerHTML = '<i class="fas fa-times"></i> မှတ်ချက်များ ပိတ်ရန်';
            toggleCommentBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        }
        
        // Ensure comments are loaded
        if (window.currentHairstyle) {
            displayComments(window.currentHairstyle.id);
        }
        
        // Start close button animation
        startCloseButtonAnimation();
        
    } else {
        // Hide comment section, show rating section and details
        commentSection.style.display = 'none';
        if (ratingSection) ratingSection.style.display = 'block';
        if (hairstyleDetails) hairstyleDetails.style.display = 'block';
        if (toggleCommentBtn) {
            toggleCommentBtn.innerHTML = '<i class="fas fa-comments"></i> မှတ်ချက်များ ကြည့်ရန်';
            toggleCommentBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }
        
        // Stop close button animation
        stopCloseButtonAnimation();
    }
}

// Add comment section to modal
function addCommentSectionToModal() {
    setTimeout(() => {
        const ratingSection = document.querySelector('.rating-section');
        if (!ratingSection || document.getElementById('toggleCommentBtn')) return;
        
        // Create toggle button (BELOW rating buttons)
        const toggleButton = document.createElement('button');
        toggleButton.id = 'toggleCommentBtn';
        toggleButton.className = 'btn toggle-comment-btn';
        toggleButton.innerHTML = '<i class="fas fa-comments"></i> မှတ်ချက်များ ကြည့်ရန်';
        toggleButton.addEventListener('click', toggleCommentSection);
        
        // Add toggle button below the horizontal button container
        const horizontalContainer = ratingSection.querySelector('.horizontal-button-container');
        if (horizontalContainer) {
            // Create a new container for the toggle button with full width
            const toggleContainer = document.createElement('div');
            toggleContainer.className = 'toggle-comment-container';
            toggleContainer.appendChild(toggleButton);
            ratingSection.appendChild(toggleContainer);
        } else {
            ratingSection.appendChild(toggleButton);
        }
        
        // Create comment section (initially hidden)
        const commentSection = document.createElement('div');
        commentSection.id = 'commentSection';
        commentSection.className = 'comment-section';
        commentSection.style.display = 'none';
        commentSection.innerHTML = `
            <div class="comment-header-bar">
                <h4>💬 မှတ်ချက်များ</h4>
                <button class="close-comments-btn" id="closeCommentsBtn">
                    <i class="fas fa-times"></i>
                    <span class="close-text">ပိတ်ရန်</span>
                </button>
            </div>
            <div class="comments-scroll-container">
                <div class="comments-list" id="commentsList">
                    <div class="comments-loading">
                        <i class="fas fa-spinner fa-spin"></i> မှတ်ချက်များ ဖတ်နေသည်...
                    </div>
                </div>
            </div>
            <div class="comment-input-fixed">
                <div class="form-group">
                    <input type="text" id="userName" placeholder="သင့်နာမည် (မထည့်လျှင် Anonymous)" class="form-input">
                </div>
                <div class="form-group">
                    <textarea id="commentText" placeholder="သင့်မှတ်ချက်ကို ဤနေရာတွင် ရေးသားပါ..." class="form-textarea" rows="2"></textarea>
                    <div class="char-count">
                        <span id="charCount">0</span>/500
                    </div>
                </div>
                <button id="submitComment" class="btn comment-submit-btn">
                    <i class="fas fa-paper-plane"></i> မှတ်ချက်တင်ပါ
                </button>
            </div>
        `;
        
        // Add comment section to modal content
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            modalContent.appendChild(commentSection);
        }
        
        // Initialize comment event listeners
        initializeCommentEvents();
        
        // Close comments button event
        const closeCommentsBtn = document.getElementById('closeCommentsBtn');
        if (closeCommentsBtn) {
            closeCommentsBtn.addEventListener('click', toggleCommentSection);
        }
        
    }, 100);
}

// Initialize comment event listeners
function initializeCommentEvents() {
    const submitBtn = document.getElementById('submitComment');
    const commentText = document.getElementById('commentText');
    const userName = document.getElementById('userName');
    const charCount = document.getElementById('charCount');
    
    if (submitBtn && commentText) {
        submitBtn.addEventListener('click', async () => {
            await handleCommentSubmit();
        });
        
        // Character count
        commentText.addEventListener('input', () => {
            if (charCount) {
                charCount.textContent = commentText.value.length;
                
                if (commentText.value.length > 500) {
                    charCount.style.color = '#ef4444';
                } else {
                    charCount.style.color = '#666';
                }
            }
        });
        
        // Submit on Enter key (with Ctrl/Cmd)
        commentText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleCommentSubmit();
            }
        });
    }
}

// Handle comment submission
async function handleCommentSubmit() {
    if (!window.currentHairstyle) {
        showCommentAlert('❌ ဆံပင်ပုံစံရွေးချယ်မှုမရှိပါ။', 'error');
        return;
    }
    
    const commentText = document.getElementById('commentText');
    const userName = document.getElementById('userName');
    const submitBtn = document.getElementById('submitComment');
    
    if (!commentText || !submitBtn) return;
    
    const comment = commentText.value.trim();
    const name = userName ? userName.value.trim() || 'Anonymous' : 'Anonymous';
    
    if (!comment) {
        showCommentAlert('⭐ ကျေးဇူးပြု၍ မှတ်ချက်ရေးသားပါ။', 'warning');
        return;
    }
    
    if (comment.length > 500) {
        showCommentAlert('❌ မှတ်ချက်သည် ရှည်လွန်းနေပါသည်။ (အများဆုံး ၅၀၀ လုံး)', 'error');
        return;
    }
    
    // Show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> တင်နေသည်...';
    submitBtn.disabled = true;
    
    try {
        const result = await submitCommentToSheet(window.currentHairstyle.id, comment, name);
        
        if (result.success) {
            showCommentAlert(result.message, 'success');
            commentText.value = '';
            if (userName) userName.value = '';
            if (charCount) charCount.textContent = '0';
            
            // Refresh comments display
            displayComments(window.currentHairstyle.id);
        } else {
            showCommentAlert(result.message, 'error');
        }
    } catch (error) {
        showCommentAlert('❌ မှတ်ချက်တင်ရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်။', 'error');
    } finally {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> မှတ်ချက်တင်ပါ';
        submitBtn.disabled = false;
    }
}

// Display comments for current hairstyle
async function displayComments(hairstyleId) {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;
    
    // Show loading
    commentsList.innerHTML = '<div class="comments-loading"><i class="fas fa-spinner fa-spin"></i> မှတ်ချက်များ ဖတ်နေသည်...</div>';
    
    // Load comments if not already loaded
    if (!commentsData[hairstyleId]) {
        await loadCommentsFromSheet(hairstyleId);
    }
    
    // Generate and display comments
    commentsList.innerHTML = generateCommentsHTML(hairstyleId);
}

// Show comment alert
function showCommentAlert(message, type = 'info') {
    const existingAlert = document.querySelector('.comment-alert');
    if (existingAlert) existingAlert.remove();
    
    const alert = document.createElement('div');
    alert.className = `comment-alert comment-alert-${type}`;
    
    const icons = {
        success: '✓',
        error: '✗',
        warning: '!',
        info: 'i'
    };
    
    alert.innerHTML = `
        <div class="alert-content">
            <span class="alert-icon">${icons[type] || 'i'}</span>
            <span class="alert-message">${message}</span>
            <button class="alert-close">×</button>
        </div>
    `;
    
    alert.querySelector('.alert-close').addEventListener('click', () => alert.remove());
    document.body.appendChild(alert);
    
    setTimeout(() => {
        if (alert.parentNode) alert.remove();
    }, 4000);
}

// Monitor modal openings for comments
function monitorModalOpeningsForComments() {
    const originalOpenModal = window.openHairstyleModal;
    
    if (originalOpenModal) {
        window.openHairstyleModal = function(hairstyle) {
            originalOpenModal(hairstyle);
            currentHairstyleId = hairstyle.id;
            
            // Reset comment section state when opening new modal
            isCommentSectionVisible = false;
            
            setTimeout(() => {
                addCommentSectionToModal();
                
                // Pre-load comments for this hairstyle
                if (!commentsData[hairstyle.id]) {
                    loadCommentsFromSheet(hairstyle.id);
                }
            }, 200);
        };
    }
}

// Add comment styles
function addCommentStyles() {
    if (document.querySelector('#comment-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'comment-styles';
    style.textContent = `
        .toggle-comment-container {
            width: 100%;
            margin-top: 15px;
        }
        
        .toggle-comment-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 15px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
            font-size: 14px;
            width: 100%;
            min-height: 44px;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }
        
        .toggle-comment-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .comment-section {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 75%;
    background: white;
    z-index: 10;
    display: none;
    flex-direction: column;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
    border: 1px solid #e1e5e9;
    overflow: hidden;
}

/* Android devices */
@media (max-width: 768px) {
    .comment-section {
        width: 95%;
        height: 100%;
    }
}

/* Small Android devices */
@media (max-width: 480px) {
    .comment-section {
        width: 95%;
        height: 100%;
    }
}

/* Very small Android devices */
@media (max-width: 360px) {
    .comment-section {
        width: 75%;
        height: 60%;
    }
}
        
        .comment-header-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 15px;
            background: #1a1a1a;
            color: white;
            flex-shrink: 0;
            border-radius: 15px 15px 0 0;
        }
        
        .comment-header-bar h4 {
            margin: 0;
            font-size: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .close-comments-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 14px;
            cursor: pointer;
            padding: 6px 12px;
            border-radius: 20px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 5px;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
            position: relative;
            overflow: hidden;
        }
        
        .close-comments-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            border-color: rgba(255, 255, 255, 0.5);
            transform: scale(1.05);
        }
        
        .close-comments-btn:active {
            transform: scale(0.95);
        }
        
        .close-comments-btn.pulse-animation {
            animation: pulse-glow 1s ease-in-out;
        }
        
        .close-text {
            font-size: 11px;
            font-weight: bold;
        }
        
        @keyframes pulse-glow {
            0% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
                border-color: rgba(239, 68, 68, 0.7);
                transform: scale(1);
            }
            50% {
                box-shadow: 0 0 0 8px rgba(239, 68, 68, 0);
                border-color: rgba(239, 68, 68, 1);
                transform: scale(1.1);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
                border-color: rgba(255, 255, 255, 0.3);
                transform: scale(1);
            }
        }
        
        .comments-scroll-container {
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            min-height: 0;
        }
        
        .comments-list {
            flex: 1;
            overflow-y: auto;
            padding: 10px 15px;
            background: #f8f9fa;
            min-height: 0;
        }
        
        .comment-input-fixed {
            background: white;
            padding: 12px 15px;
            border-top: 1px solid #e9ecef;
            flex-shrink: 0;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }
        
        .form-group {
            margin-bottom: 10px;
        }
        
        .form-input, .form-textarea {
            width: 100%;
            padding: 8px 10px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
            font-size: 13px;
            resize: vertical;
        }
        
        .form-input:focus, .form-textarea:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
        }
        
        .form-textarea {
            min-height: 60px;
            max-height: 100px;
        }
        
        .char-count {
            text-align: right;
            font-size: 11px;
            color: #666;
            margin-top: 3px;
        }
        
        .comment-submit-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
            width: 100%;
            justify-content: center;
            font-size: 13px;
        }
        
        .comment-submit-btn:hover:not(:disabled) {
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
            transform: translateY(-1px);
        }
        
        .comment-submit-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
        
        .comment-item {
            background: white;
            padding: 10px;
            margin-bottom: 8px;
            border-radius: 6px;
            border: 1px solid #e9ecef;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        .comment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
        
        .comment-user {
            font-weight: bold;
            color: #333;
            font-size: 13px;
        }
        
        .comment-time {
            font-size: 11px;
            color: #666;
        }
        
        .comment-text {
            color: #444;
            line-height: 1.4;
            font-size: 13px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .no-comments {
            text-align: center;
            padding: 30px 20px;
            color: #666;
        }
        
        .no-comments i {
            font-size: 2.5rem;
            margin-bottom: 10px;
            opacity: 0.3;
        }
        
        .no-comments-sub {
            font-size: 11px;
            opacity: 0.7;
            margin-top: 5px;
        }
        
        .comments-loading {
            text-align: center;
            padding: 30px 20px;
            color: #666;
        }
        
        .comment-alert {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border-radius: 8px;
            padding: 12px 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border-left: 4px solid #ddd;
            z-index: 10000;
            max-width: 350px;
            animation: slideInRight 0.3s ease;
            font-family: 'Pyidaungsu', 'Myanmar3', 'Noto Sans Myanmar', sans-serif;
        }
        
        .comment-alert-success { border-left-color: #10b981; background: #10b981; color: white; }
        .comment-alert-error { border-left-color: #ef4444; background: #ef4444; color: white; }
        .comment-alert-warning { border-left-color: #f59e0b; background: #f59e0b; color: white; }
        .comment-alert-info { border-left-color: #3b82f6; background: #3b82f6; color: white; }
        
        /* Scrollbar styling */
        .comments-list::-webkit-scrollbar {
            width: 4px;
        }
        
        .comments-list::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 2px;
        }
        
        .comments-list::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 2px;
        }
        
        .comments-list::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .toggle-comment-btn {
                font-size: 13px;
                padding: 10px 12px;
            }
            
            .comments-list {
                padding: 8px 12px;
            }
            
            .comment-input-fixed {
                padding: 10px 12px;
            }
            
            .comment-alert {
                top: 10px;
                right: 10px;
                left: 10px;
                max-width: none;
            }
            
            .close-comments-btn {
                padding: 5px 10px;
                font-size: 12px;
            }
            
            .close-text {
                font-size: 10px;
            }
            
            .comment-header-bar {
                padding: 10px 12px;
            }
            
            .comment-header-bar h4 {
                font-size: 14px;
            }
        }
        
        @media (max-width: 480px) {
            .comment-header-bar {
                padding: 8px 10px;
            }
            
            .comment-header-bar h4 {
                font-size: 13px;
            }
            
            .form-input, .form-textarea {
                padding: 6px 8px;
                font-size: 12px;
            }
            
            .comment-submit-btn {
                padding: 8px 12px;
                font-size: 12px;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize comment system
function initializeCommentSystem() {
    addCommentStyles();
    monitorModalOpeningsForComments();
    
    // Load all comments in background when page loads
    setTimeout(() => {
        loadAllCommentsInBackground();
    }, 2000);
    
    console.log('✅ Comment system initialized with background loading');
}

// Export functions
window.CommentSystem = {
    initializeCommentSystem,
    loadCommentsFromSheet,
    submitCommentToSheet,
    displayComments,
    toggleCommentSection
};

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCommentSystem);
} else {
    initializeCommentSystem();
}