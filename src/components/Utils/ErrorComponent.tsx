export default function ErrorDisplay({ message }: { message: string | null }) {
    return (
        <div className="p-4 rounded-md flex justify-center items-center border border-red-600 bg-red-100 ">
            <div className="text-red-600 text-base">{message ?? "An Error occurred"}</div>
        </div>

    )

}