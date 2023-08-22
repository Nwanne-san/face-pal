import { TextField, Button } from '@mui/material';
import { PastTransaction } from '../../components/PastTransaction';
import Link from 'next/link';

export default function MakeTransfer() {
    return (
        <main className="px-6 sm:px-10 md:px-20">
            <Link href="/feeds" className="text-indigo-800 text-4xl sm:text-6xl font-mono font-bold">facepal</Link>

            <section className='mt-6 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-6'>
                <article className="bg-rose-100 p-4 rounded-xl">
                    <h3 className="text-3xl">Make Transfer</h3>

                    <form className='w-full flex flex-col gap-4'>
                        <TextField 
                            id="outlined-basic" 
                            label="Account email" //placeholder 
                            variant="outlined" 
                            color="secondary"
                        />
                        <p>Jack Bauer</p>
                        <TextField 
                            id="outlined-basic" 
                            label="Amount" //placeholder 
                            variant="outlined" 
                            color="secondary"
                        />

                        <Button 
                            variant='contained'
                            color='secondary'
                        >Transfer</Button>
                    </form>
                </article>

                <aside className="border border-gray-200 p-4 rounded-xl">
                    <h3 className="text-3xl text-gray-700 ">Recent Transfer</h3>

                    <ul className='h-[400px]  flex flex-col gap-3 overflow-y-scroll'>
                        <PastTransaction 
                            recipient="Mary Adewale"
                            email="mary@interswitch.com"
                            amount={46000}
                            time="1 hour"
                        />
                        <PastTransaction 
                            recipient="Omar Zahad"
                            email="recker@yahoo.com"
                            amount={46000}
                            time="2 hours"
                        />
                        <PastTransaction 
                            recipient="Mary Adewale"
                            email="mary@interswitch.com"
                            amount={33000}
                            time="13 hours"
                        />
                        <PastTransaction 
                            recipient="James Bond"
                            email="mary@interswitch.com"
                            amount={100000}
                            time="15 hours"
                        />
                        <PastTransaction 
                            recipient="Chidex Agu"
                            email="dejoe@interswitch.com"
                            amount={46000}
                            time="22 hours"
                        />
                        <PastTransaction 
                            recipient="Chidex Agu"
                            email="dejoe@interswitch.com"
                            amount={46000}
                            time="22 hours"
                        />
                        <PastTransaction 
                            recipient="Chidex Agu"
                            email="dejoe@interswitch.com"
                            amount={46000}
                            time="22 hours"
                        />
                        <PastTransaction 
                            recipient="Chidex Agu"
                            email="dejoe@interswitch.com"
                            amount={46000}
                            time="22 hours"
                        />
                        <PastTransaction 
                            recipient="Chidex Agu"
                            email="dejoe@interswitch.com"
                            amount={46000}
                            time="22 hours"
                        />
                        <PastTransaction 
                            recipient="Chidex Agu"
                            email="dejoe@interswitch.com"
                            amount={46000}
                            time="22 hours"
                        />

                        <Link href="/account/transfer-history">All transfer history</Link>
                    </ul>
                    
                </aside>
            </section>
        </main>
    )
}