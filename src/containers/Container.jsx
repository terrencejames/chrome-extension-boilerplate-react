import { useState, useCallback, useEffect } from 'react';
import React from 'react';
import { Card } from '../components/Card';
import update from 'immutability-helper';
const style = {
    width: 400
};
export const Container = (props) => {
    {
        const [cards, setCards] = useState([]);

        useEffect(() => {
          setCards(props.tabAndGroupList);
          console.log(props);
        }, [props.tabAndGroupList]);

        const moveCard = useCallback((dragIndex, hoverIndex) => {
            const dragCard = cards[dragIndex];
            setCards(update(cards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragCard],
                ],
            }));
        }, [cards]);
        const renderCard = (tab, index) => {
            return (<Card key={tab.id} index={index} id={tab.id} text={tab.text} moveCard={moveCard}/>);
        };

        return (<>
				<div style={style}>{cards.map((tab, i) => renderCard(tab, i))}</div>
			</>);
    }
};
 export default Container;
