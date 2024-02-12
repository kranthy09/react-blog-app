import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/commentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })

    const { articleId } = useParams();
    const { user, isLoading } = useUser();
    console.log(articleId);
    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/articles/${articleId}`, { headers });
            const newArticleInfo = response.data;
            console.log(response.data);
            setArticleInfo(newArticleInfo);
        }
        loadArticleInfo();
    }, []);
    const article = articles.find(article => article.name === articleId)

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    }


    if (!article) {
        return (
            <NotFoundPage />
        )
    }
    console.log('articleInfo:', articleInfo);
    return (
        <>
            <h1>{article.title}</h1>
            <div className="upvotes-section">
                {user ?
                    <button onClick={addUpvote}>Upvote</button>
                    : <button>Login</button>}
            </div>
            <p>This article has {articleInfo.upvotes} upvote(s)</p>
            {article.content.map((paragraph, i) => (<p key={i}>{paragraph}</p>))}
            {user ?
                <AddCommentForm
                    articleName={articleId}
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
                : <button>Log in to add a comment</button>}
            <CommentsList comments={articleInfo.comments} />
        </>
    );
}

export default ArticlePage;
