export default function ChatMessage() {
  return (
    <div>
      <div className="flex items-center justify-center bg-amber-300">
        <div>超级写手头部</div>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div>根据关键词，主题或者概念，写一篇没有AI味的文章</div>
        <div className="fixed bottom-4 h-30 w-11/12 rounded-lg border-current bg-amber-300 sm:w-1/2 ">
          <div className="p-4">向91AI助手发消息，使用@搜索应用</div>
        </div>
      </div>
    </div>
  );
}
