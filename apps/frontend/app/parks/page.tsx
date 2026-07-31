import { api } from '../lib/api'

async function getParks() {
    const res = await api.get("/parcs");
    console.log('res data', res.data.data)
    return res.data.data;
}

export default async function ParksPage() {
    const parks = await getParks()
    return (
        <div id="page-wrapper" className="mx-auto w-3/4 my-8">
            <h1 className="text-3xl font-semibold tracking-tight my-8">Our wonderful lists of parks to visit</h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {parks.map((p: any) => (
                    <div key={p.id} className="rounded-lg border border-zinc-200 p-4 shadow-sm dark:border-zinc-700">
                        <strong className="block text-lg">{p.name}</strong>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}