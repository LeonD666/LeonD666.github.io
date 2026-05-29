const supabase = supabase.createClient(
'https://vslbcwnuqlgegvfnrfej.supabase.co/rest/v1/',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbGJjd251cWxnZWd2Zm5yZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzY0NjIsImV4cCI6MjA5NTYxMjQ2Mn0.tSKIrkx4VoAzxllVq34Xme8ToAP1yHLDI_rCMDWykEQ'
);

// 向Supabase提交表单时调用这个函数
    async function submitMessage(payNumb, custName, custPhone, custAddr) {
    const { error } = await supabase
        .from('messages')
        .insert([{ 
        name: custName, 
        payId: payNumb, 
        phone: custPhone, 
        address: custAddr 
        }]);
    
    if (error) alert('提交失败');
    else alert('提交成功');
    }    