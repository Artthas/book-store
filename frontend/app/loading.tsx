export default function Loading() {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-gray-700"></div>
    </div>
  )
}