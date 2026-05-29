console.log('Supabase loaded:', typeof supabase); // 调试用，上线后可删除

const supabaseClient = supabase.createClient({
  url: 'https://vslbcwnuqlgegvfnrfej.supabase.co/rest/v1/',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbGJjd251cWxnZWd2Zm5yZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzY0NjIsImV4cCI6MjA5NTYxMjQ2Mn0.tSKIrkx4VoAzxllVq34Xme8ToAP1yHLDI_rCMDWykEQ'
});

console.log('Supabase client created:', supabaseClient); // 调试用

async function submitMessage(payNumb, custName, custPhone, custAddr) {
  const { error } = await supabaseClient
    .from('messages')
    .insert([{ 
      name: custName, 
      payId: payNumb, 
      phone: custPhone, 
      address: custAddr 
    }]);
  
  if (error) { 
    console.error(error);
    alert('提交失败: ' + error.message); 
  } else {
    alert('提交成功');
  }
}