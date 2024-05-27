import React, {useState} from "react";

const AppTest = () => {
    const [items, setItems] = useState<{ id: number, items: string[] }[]>([{
        id: 1,
        items: ["ok"]
    }]);

    const addNewItem = () => {
        const newId = items.length + 1;
        const newItem = {
            id: items[0].id,
            items: [`new item ${newId}`]
        };
        setItems([...items, newItem]);
    };

    return (
        <div>
            <button onClick={addNewItem}>add new item</button>
            {items.map(item => (
                <div key={item.id}>
                    <h3>Item {item.id}</h3>
                    <ul>
                        {item.items.map((subItem, index) => (
                            <li key={index}>{subItem}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default AppTest;
