import React from "react";
import drake from "../assets/drake.jpg";

function CommentComp({commentData}) {
  return (
    <div className="flex gap-2">
      <div>
        <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
          <img src={commentData.avatar} alt="com author" />
        </div>
      </div>
      <div>
        <p className="font-semibold text-[16px]">{commentData.commentUser}</p>
        <p>
          {commentData.comment}
        </p>
      </div>
    </div>
  );
}

export default CommentComp;
