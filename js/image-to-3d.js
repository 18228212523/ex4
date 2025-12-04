// ★★★ 实验四：图生3D页交互功能 ★★★
document.addEventListener('DOMContentLoaded', function() {

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const generateBtn = document.getElementById('generate-3d-btn');
    const modelView = document.querySelector('.model-placeholder');

    // 1. 点击上传区域触发文件选择
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });

    // 2. 文件选择变化时预览
    fileInput.addEventListener('change', function(e) {
        handleFile(e.target.files[0]);
    });

    // 3. 拖拽上传功能
    // 阻止默认拖拽行为
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // 高亮拖拽区域
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('dragover');
    }
    
    function unhighlight() {
        dropZone.classList.remove('dragover');
    }
    
    // 处理拖放文件
    dropZone.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const file = dt.files[0];
        handleFile(file);
    }, false);

    // 处理文件并预览
    function handleFile(file) {
        if (!file.type.match('image.*')) {
            alert('请选择图片文件！');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="预览">`;
            imagePreview.style.display = 'block';
            // 更新3D预览区域的背景图
            modelView.style.backgroundImage = `url(${e.target.result})`;
            modelView.style.backgroundSize = 'cover';
            modelView.textContent = '';
        };
        reader.readAsDataURL(file);
    }

    // 4. 模拟3D模型交互（鼠标拖动旋转）
    let isDragging = false;
    let startX, startY;
    let rotateX = 0, rotateY = 0;

    modelView.addEventListener('mousedown', function(e) {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        this.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        // 根据鼠标移动距离更新旋转角度
        rotateY += deltaX * 0.5;
        rotateX -= deltaY * 0.5;
        
        // 应用3D旋转
        modelView.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        startX = e.clientX;
        startY = e.clientY;
    });

    document.addEventListener('mouseup', function() {
        isDragging = false;
        modelView.style.cursor = 'grab';
    });

    // 5. 生成3D按钮事件
    generateBtn.addEventListener('click', function() {
        if (!fileInput.files[0]) {
            alert('请先选择或拖拽一张图片！');
            return;
        }
        
        this.disabled = true;
        this.textContent = '正在生成3D模型...';
        
        // 模拟3D生成过程
        setTimeout(() => {
            this.disabled = false;
            this.textContent = '生成3D模型';
            alert('3D模型生成完成！您可以用鼠标拖拽上面的模型进行旋转查看。');
        }, 2000);
    });

    console.log('图生3D页交互加载完成！');
});