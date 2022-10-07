import { useState, Fragment } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { FiCheck } from "react-icons/fi";
import { RiArrowUpDownLine } from "react-icons/ri";

// const board = [
//     { id: 1, name: 'Wade Cooper' },
//     { id: 2, name: 'Arlene Mccoy' },
//     { id: 3, name: 'Devon Webb' },
//     { id: 4, name: 'Tom Cook' },
//     { id: 5, name: 'Tanya Fox' },
//     { id: 6, name: 'Hellen Schmidt' },
// ]

export default function MyCombobox({board=[]}) {
    console.log(board)
    const [selected, setSelected] = useState(board[0])
    const [query, setQuery] = useState('')

    const filteredboard =
        query === ''
            ? board
            : board.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className=" w-72">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 outline-none"
                            displayValue={(person) => person.name}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="select"
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            < RiArrowUpDownLine
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredboard.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredboard.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-qp-orange text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-qp-orange'
                                                            }`}
                                                    >
                                                        <FiCheck className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}