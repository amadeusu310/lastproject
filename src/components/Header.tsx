import Link from 'next/link'

export const Header:React.FC = () => {
    return (
        <header className="bg-blue-500 w-full h-20 text-white bg-blue-800 hover:bg-blue-700">                          
            <nav className=" flex h-20 justify-between">
                <div className="text-xl font-bold  p-4 m-2">
                    <h1>求人検索アプリ</h1>
                </div>
                <ul className="flex justify-around w-1/4">
                    <li className="mt-7"><Link href="/">求人検索</Link></li>
                    <li className="mt-7"><Link href="/new-post">求人投稿</Link></li>
                </ul>
            </nav>
        </header>
        )
}