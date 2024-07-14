/*
FireStore-ban tudunk tárolni bizonyos dolgokat, hasonlóna müködik mint egy cloud szolgáltatás 
van egy collection amit csinálunk és oda tudunk feltölteni dokumentumokat vagy amiket akarunk!!!! 

Vannak ilyen beépített funkciói, hogy addDoc, deleteDoc, getDocs stb.!!!!!!!! 
ez is await-es, mint a FireBase vagy egy Api kérés!!!!!!
*/

import { useEffect, useState } from "react";
import { db } from "./fb";
import { addDoc, deleteDoc, collection, doc, getDocs } from "firebase/firestore";

function Todo() {
    const [todoName, setTodoName] = useState("");
    const [todos, setTodos] = useState([]);
    const [importance, setImportance] = useState(0);
    const [errors, setErrors] = useState([]);

    const getTodos = async () => {
        /*
        a firestore-ban csináltunk egy collection-t (db) és abba meg egy todos dokumentumot és ezt akarjuk megszerezni 
        és azzal frissíteni a todos tömböt!!!!!  
        ehhez használjuk majd a getDocs beépített függvényt, fontos, hogy kell ehhez egy await!!!! 
        vár két paramétert
        1. collection
        2. documentum neve 
        */
        const snapshots = await getDocs(db, "todos");
        /*
        végigmegyünk egy map-val a dokumentumokon csinálunk egy objektumot (majd beletöltjük az ott beírt dolgokat 
        amit a firebase honlapján beírtunk)
        Id-nek megadjuk a doc.id-t minden egyesnek, minden iterációnál 
        a ...doc.data() -> az meg spread-eli a documents.data propertieit egy új objektumba!!!!!!! 
        és ezzel set-eljük a todos-t 
        */
        const todoData = snapshots.docs.map(doc => ({ ID: doc.id, ...doc.data() }));
        setTodos(todoData);
    };
    //ezt meghívjuk egy useEffect-ben, hogy meg legyen ez amit csináltunk a getTodos()-ban 
    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async () => {
        /*
        itt meg hozzá tudunk adni todo-kat, amiket mi csinálunk itt és fel tudjuk majd tölteni a addDoc-val 
        */
        const es = [];

        if (todoName.length === 0)
            es.push("You must fill out the 'Todo name' field!");

        if (importance === 0)
            es.push("You must select the importance of the task!")

        setErrors(es);

        //ha volt hibánk akkor nem megyünk tovább, hanem return!!!! 
        if (es.length !== 0)
            return;

        const todo = {
            TodoName: todoName,
            Importance: importance
        }
        /*
        Van két useStates-s változónk egyik a todoName, másik az importance
        ezek mindig az aktuális todo-t meg az importance-t tartalmazzák, vannak itt elmentve!!!!! 
        ezek adjuk meg az objektumok-nak value-ként
        */

        const docRef = await addDoc(collection(db, "todos"), todo);
        //beletesszük a db-nek todos collection-jába azt a todo objektumot, amit csináltunk 

        todo.ID = docRef.id;
        /*
        docRef.id retrieves the ID of the newly created document from the DocumentReference.
        todo.ID = docRef.id assigns this ID to the ID property of the todo object.

        tehát itt megadjuk a todo id-nak a docRef-nek az id-ját!!!!  
        */

        /*
        frissítjük az itteni todos-t is, fontos hogy amikor valahol máshova is feltöltjük az adatokat pl. ilyen a localStorage
        akkor azt is meg az itteni useState-s tömböt is frissíteni kell!!!!! 
        */
        setTodos([...todos, todo]);
        //TodoName-et meg mindig ki kell üríteni, hogy újat tudjunk majd felvinni!!! 
        setTodoName("");
        //importance ugyanez, mindig amikor feltöktünk valamit vissza kell tenni a useState-s az eredeti értékére!!!
        //hogy tudjunk más adatokat is majd felvinni!!! 
        setImportance(0);
    }

    const deleteTodo = async () => {
        /*
        Ha törölni akarunk valamit, akkor kell egy id, hogy tudjuk melyik dolgok szeretnénk majd törölni a tömbből!!!! 
        ezért kérünk be egy id-t 
        amivel majd a todos-ból id-alapján töröljük 
        A useStates meg set-eljük, úgyhogy végigmegyünk egy filter-vel és majd mindent, aminek nem az az id-ja azt beletesszük 
        fontos, hogy filter-t ha tagadunk valamit, akkor így is lehet használni!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        */
        try {
            await deleteDoc(doc(db, "todos", id));
            //azokat tesszük bele, aminek nem találtuk meg az id-ját, tehát minden mást, kivéve azt az id-t(todo-t) amit itt vár a függvény
            setTodos(todos.filter(todo=>todo.id !== id));
        } catch(err) {
            console.log(err);
        }
    };

    return(
        <div className="container center-text">
            <div className="error-messages" style={{display:errors.length === 0 ? "none" : "block"}}>
                {
                    errors.map((e, i)=> 
                        <div className="error-message" key={i}>{e}</div>
                    )
                }
            </div>
            <h3>Todo name</h3>
            <input onChange={e=>setTodoName(e.target.value)}
            className="center-input w-350"
            value={todoName} type="text"/>

            <h3>Todo importance</h3>
            <select onChange={e=>setImportance(parseInt(e.target.value))}
            value={importance} className="center-input">
                <option value={0}>Select an importance</option>
                <option value={1}>Less important</option>
                <option value={2}>More important</option>
                <option value={3}>Highly important</option>
            </select>

            <button className="center-input"
            onClick={addTodo}>Add todo</button>

            {
                todos.map((t, i)=> {
                    let cls = "less important";

                    if(t.Importance === 2) {
                        cls = "more important";
                    } else if(t.importance === 3) {
                        cls = "highly important";
                    }

                    return <li className={cls} key={i}>
                        <div>{t.todoName}</div>
                        <button onClick={()=>deleteTodo(t.ID)}></button>
                    </li>
                })
            }
        </div>
    );
}


export default Todo;