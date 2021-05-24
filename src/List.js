import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItem, editItem }) => {
    return (
        <div>
            {items.map((item) => {
                const { id, title } = item;
                return (
                    <article key={id}>
                        <p>{title}</p>
                        <div>
                            <button
                                onClick={() => editItem(id)}
                                type="button"><FaEdit /></button>
                            <button
                                onClick={() => removeItem(id)}
                                type="button"><FaTrash /></button>
                        </div>
                    </article>
                )
            })}
        </div>
    )
}

export default List
