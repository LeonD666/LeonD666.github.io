// 1. 初始化 Supabase 客户端 (避免重复声明)
  const supabaseUrl = 'https://vslbcwnuqlgegvfnrfej.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbGJjd251cWxnZWd2Zm5yZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzY0NjIsImV4cCI6MjA5NTYxMjQ2Mn0.tSKIrkx4VoAzxllVq34Xme8ToAP1yHLDI_rCMDWykEQ';
  const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);


// 2. 等待 DOM 加载完毕
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('customerForm');
    const phoneInput = document.getElementById('phone');
    const payIdInput = document.getElementById('payment-number');
       
    // 【实时清洗】限制只能输入数字，并截断长度
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 11);
    });

    payIdInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '').slice(0, 31);
    });

    // 【提交拦截与防空校验】
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // 关键：阻止表单默认刷新页面的行为

        // 获取值并去除首尾空格
        const name = document.getElementById('name').value.trim();
        const phone = phoneInput.value.trim();
        const payId = payIdInput.value.trim();
        const address = document.getElementById('address').value.trim();

        // 防空校验
        if (!name || !payId || !phone || !address) {
            alert('请将所有信息填写完整后再提交！');
            return; // 直接退出，不执行后续的插入操作
        }

        // 格式二次校验（可选，但推荐）
        if (!/^1[3-9]\d{9}$/.test(phone)) {
            alert('请输入正确的11位手机号！');
            return;
        }
        if (!/^\d{31}$/.test(payId)) {
            alert('Pay ID必须是31位纯数字！');
            return;
        }

        // 3. 校验通过，调用 Supabase 插入数据
        try {
            const { data, error } = await supabaseClient
                .from('messages') // 确保表名正确
                .insert([{ 
                    name: name, 
                    payId: payId, 
                    phone: phone, 
                    address: address 
                }]);

            if (error) throw error;

            alert('🎉 提交成功！感谢您的订购。');
            form.reset(); // 清空表单内容
            
        } catch (err) {
            console.error('Supabase 报错:', err.message);
            alert('❌ 提交失败，请稍后重试。');
        }
    });
});