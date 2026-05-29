  // 初始化客户端
  const supabaseUrl = 'https://vslbcwnuqlgegvfnrfej.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbGJjd251cWxnZWd2Zm5yZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzY0NjIsImV4cCI6MjA5NTYxMjQ2Mn0.tSKIrkx4VoAzxllVq34Xme8ToAP1yHLDI_rCMDWykEQ';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // 绑定表单提交事件
  document.getElementById('custName', 'payNumb', 'custPhone', 'custAddr').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('custName').value;
    const payId = document.getElementById('payNumb').value;
    const phone = document.getElementById('custPhone').value;
    const address = document.getElementById('custAddr').value;

    // 向数据库插入数据
    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, payId, phone, address }]);

    if (error) {
      alert('提交失败: ' + error.message);
    } else {
      alert('提交成功！');
      e.target.reset();
    }
  });