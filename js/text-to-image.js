// ★★★ 实验四：文图生成页交互功能 ★★★
document.addEventListener('DOMContentLoaded', function() {

    const textarea = document.querySelector('textarea');
    const tags = document.querySelectorAll('.tag');
    const generateBtn = document.getElementById('generate-btn');
    const progressContainer = document.querySelector('.progress-container');
    const progressFill = document.querySelector('.progress-fill');

    // 1. 点击标签，将关键词添加到输入框
    tags.forEach(tag => {
        tag.addEventListener('click', function() {
            const keyword = this.getAttribute('data-tag');
            const currentText = textarea.value.trim();
            
            if (currentText === '') {
                textarea.value = keyword;
            } else if (!currentText.includes(keyword)) {
                // 如果关键词不存在，则添加
                textarea.value = currentText + '，' + keyword;
            }
            // 给用户一个视觉反馈
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // 2. 生成按钮点击事件 - 模拟AI生成过程
    generateBtn.addEventListener('click', function() {
        if (textarea.value.trim() === '') {
            alert('请输入设计描述！');
            return;
        }

        // 禁用按钮，防止重复点击
        this.disabled = true;
        this.textContent = '生成中...';
        
        // 显示进度条
        progressContainer.style.display = 'block';
        progressFill.style.width = '0%';

        // 模拟进度
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // 恢复按钮状态
                setTimeout(() => {
                    this.disabled = false;
                    this.textContent = '生成设计图';
                    progressContainer.style.display = 'none';
                    
                    // 显示生成结果（这里用模拟）
                    const resultDiv = document.querySelector('.result-placeholder');
                    resultDiv.innerHTML = `
                        <h4>生成成功！</h4>
                        <p>基于"${textarea.value}"的设计已生成。</p>
                        <img src="https://via.placeholder.com/300x200/667eea/ffffff?text=AI设计图" style="max-width:100%; border-radius:8px;">
                        <p><button onclick="saveDesign()">保存此设计</button></p>
                    `;
                }, 500);
            }
        }, 50); // 50毫秒更新一次，总共约2.5秒
    });

    // 模拟保存功能
    window.saveDesign = function() {
        alert('设计已保存到您的作品集！');
    };

    console.log('文图生成页交互加载完成！');
});