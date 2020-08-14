import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import ArticleList from '../pages/ArticleList';
import SingleArticle from '../pages/SingleArticle';
import ErrorBlock from '../ErrorBlock';


export const App = () => {
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/articles/:articleId" 
                    render={({match}) => {
                        const { articleId } = match.params;
                        return <SingleArticle articleId={ articleId }/>
                    }}
                />
                <Route path="/articles/" component={ArticleList} />

                <Route path="/" component={ArticleList} exact/>

                <Route render={() => {
                    return (<ErrorBlock> 404. That page does not exist! </ErrorBlock>);
                }}/>
            </Switch>
        </div>
    )
}


export default App
