export default function Spinner() { // 대기상태 나타내는 스피너(아이콘)
    return (
      <div className="flex justify-center py-4">
        <div 
          className="w-8 h-8 border-4 border-blue-500 rounded-full"
        >
        </div>
      </div>
    )
  }