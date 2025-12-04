// ★★★ 实验四：个性定制页交互功能 ★★★
document.addEventListener('DOMContentLoaded', function() {

    // 获取所有控制元素
    const beadSize = document.getElementById('beadSize');
    const beadSizeValue = document.getElementById('beadSizeValue');
    const beadCount = document.getElementById('beadCount');
    const beadCountValue = document.getElementById('beadCountValue');
    const stringColor = document.getElementById('stringColor');
    const beadShape = document.getElementById('beadShape');
    const materialType = document.getElementById('materialType');
    const patternStyle = document.getElementById('patternStyle');
    
    // 获取预览元素
    const livePreview = document.getElementById('livePreview');
    const targetBead = document.getElementById('targetBead');
    const applyButton = document.querySelector('.btn-primary');
    const resetButton = document.querySelector('.btn-secondary');

    // 1. 实时更新滑块值显示
    beadSize.addEventListener('input', function() {
        beadSizeValue.textContent = this.value + 'mm';
        updateLivePreview();
    });
    
    beadCount.addEventListener('input', function() {
        beadCountValue.textContent = this.value;
        updateLivePreview();
    });

    // 2. 为所有控件添加输入监听
    const allControls = [stringColor, beadShape, materialType, patternStyle];
    allControls.forEach(control => {
        control.addEventListener('input', updateLivePreview);
        control.addEventListener('change', updateLivePreview);
    });

    // 3. 实时更新预览
    function updateLivePreview() {
        // 更新目标珠子的样式
        const size = beadSize.value;
        const color = stringColor.value;
        const shape = beadShape.value;
        
        // 大小
        targetBead.style.width = `${size}px`;
        targetBead.style.height = `${size}px`;
        
        // 颜色
        targetBead.style.background = `radial-gradient(circle at 30% 30%, #ffffff, ${color})`;
        
        // 形状
        if (shape === 'cube') {
            targetBead.style.borderRadius = '5px';
        } else if (shape === 'cylinder') {
            targetBead.style.borderRadius = '10px/50%';
        } else {
            targetBead.style.borderRadius = '50%';
        }
        
        // 材质效果
        const material = materialType.value;
        if (material === 'crystal') {
            targetBead.style.boxShadow = '0 0 15px rgba(255,255,255,0.8), inset 0 0 10px rgba(255,255,255,0.5)';
        } else if (material === 'wood') {
            targetBead.style.backgroundImage = `repeating-linear-gradient(45deg, transparent, transparent 5px, ${color} 5px, ${color} 10px)`;
        } else {
            targetBead.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.2)';
        }
        
        // 根据珠子数量生成多个珠子预览
        const count = beadCount.value;
        generateBeads(count);
    }

    // 4. 生成多个珠子预览
    function generateBeads(count) {
        // 清空现有珠子（除了目标珠子）
        const beads = livePreview.querySelectorAll('.bead:not(#targetBead)');
        beads.forEach(bead => bead.remove());
        
        // 如果只需要1个，就只显示目标珠子
        if (count <= 1) {
            targetBead.style.display = 'block';
            targetBead.style.top = '50%';
            targetBead.style.left = '50%';
            targetBead.style.transform = 'translate(-50%, -50%)';
            return;
        }
        
        // 隐藏目标珠子
        targetBead.style.display = 'none';
        
        // 根据排列样式生成珠子
        const pattern = patternStyle.value;
        const size = parseInt(beadSize.value);
        
        for (let i = 0; i < count; i++) {
            const bead = document.createElement('div');
            bead.className = 'bead';
            bead.style.width = `${size}px`;
            bead.style.height = `${size}px`;
            
            // 设置位置
            if (pattern === 'single') {
                // 单排水平排列
                const spacing = livePreview.offsetWidth / (count + 1);
                bead.style.top = '50%';
                bead.style.left = `${(i + 1) * spacing}px`;
                bead.style.transform = 'translate(-50%, -50%)';
            } else if (pattern === 'double') {
                // 双排
                const row = i % 2;
                const col = Math.floor(i / 2);
                const spacingX = livePreview.offsetWidth / (Math.ceil(count / 2) + 1);
                const spacingY = livePreview.offsetHeight / 3;
                bead.style.top = `${(row + 1) * spacingY}px`;
                bead.style.left = `${(col + 1) * spacingX}px`;
                bead.style.transform = 'translate(-50%, -50%)';
            } else if (pattern === 'spiral') {
                // 螺旋排列
                const angle = (i * 2 * Math.PI) / count;
                const radius = Math.min(livePreview.offsetWidth, livePreview.offsetHeight) * 0.3;
                bead.style.top = `calc(50% + ${Math.sin(angle) * radius}px)`;
                bead.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
                bead.style.transform = 'translate(-50%, -50%)';
            }
            
            // 设置颜色和样式
            bead.style.background = targetBead.style.background;
            bead.style.borderRadius = targetBead.style.borderRadius;
            bead.style.boxShadow = targetBead.style.boxShadow;
            
            // 添加轻微延迟形成动画
            bead.style.transitionDelay = `${i * 0.05}s`;
            
            livePreview.appendChild(bead);
        }
    }

    // 5. 应用调整按钮 - 增强反馈
    applyButton.addEventListener('click', function() {
        // 添加脉冲动画
        this.classList.add('pulse');
        
        // 更新"原始模型"预览为当前设置
        const originalPreview = document.getElementById('originalPreview');
        originalPreview.innerHTML = '';
        
        const cloneBead = targetBead.cloneNode(true);
        cloneBead.style.position = 'absolute';
        cloneBead.style.top = '50%';
        cloneBead.style.left = '50%';
        cloneBead.style.transform = 'translate(-50%, -50%)';
        cloneBead.id = '';
        originalPreview.appendChild(cloneBead);
        
        // 显示成功消息
        const message = document.createElement('div');
        message.style.cssText = 'position:absolute; bottom:10px; left:0; right:0; text-align:center; color:#667eea; font-weight:bold;';
        message.textContent = '✓ 调整已应用';
        originalPreview.appendChild(message);
        
        // 移除动画类
        setTimeout(() => {
            this.classList.remove('pulse');
            setTimeout(() => message.remove(), 2000);
        }, 500);
        
        alert('您的设计调整已成功应用！');
    });

    // 6. 重置按钮功能
    resetButton.addEventListener('click', function() {
        if (confirm('确定要重置所有参数吗？')) {
            // 重置控件值
            beadSize.value = 8;
            beadSizeValue.textContent = '8mm';
            beadCount.value = 50;
            beadCountValue.textContent = '50';
            stringColor.value = '#000000';
            beadShape.value = 'round';
            materialType.value = 'glass';
            patternStyle.value = 'single';
            
            // 更新预览
            updateLivePreview();
            
            // 反馈动画
            this.classList.add('pulse');
            setTimeout(() => this.classList.remove('pulse'), 500);
            
            alert('所有参数已重置为默认值！');
        }
    });

    // 初始化预览
    updateLivePreview();
    
    console.log('个性定制页交互加载完成！');
});