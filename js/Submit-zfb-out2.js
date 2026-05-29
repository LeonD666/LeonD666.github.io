  // 初始化客户端
  const supabaseUrl = 'https://vslbcwnuqlgegvfnrfej.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbGJjd251cWxnZWd2Zm5yZmVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwMzY0NjIsImV4cCI6MjA5NTYxMjQ2Mn0.tSKIrkx4VoAzxllVq34Xme8ToAP1yHLDI_rCMDWykEQ';
  const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

 
// 确保 DOM 加载完毕后再绑定事件
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("submitBtn");

  if (btn) {
    btn.addEventListener("click", async () => {
      // 在这里执行你的提交逻辑
      console.log("按钮被点击，开始提交...");
      await submitData();
    });
  } else {
    console.error("未找到 ID 为 submitBtn 的按钮元素");
  }
});

// 定义具体的提交逻辑函数
async function submitData() {
  try {
    const { data, error } = await supabaseClient.from("messages").insert([
      {
        name: document.getElementById("name").value, // 假设你有对应的 input ID
        phone: document.getElementById("phone").value,
        pay_order: document.getElementById("payment-number").value,
        address: document.getElementById("address").value,
      },
    ]);

    if (error) throw error;
    alert("提交成功！");
    console.log("插入的数据:", data);
  } catch (err) {
    console.error("提交失败:", err.message);
    alert("提交出错: " + err.message);
  }
} 