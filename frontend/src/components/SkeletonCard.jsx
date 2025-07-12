import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Card from "react-bootstrap/Card";

const SkeletonCard = () => {
  return (
    <Card className="mb-4 shadow-sm card-img-top">
      <Skeleton height={180} className="card-img-top" />
      <Card.Body>
        <Skeleton height={20} width={80} className="mb-2" />
        <Skeleton height={20} width={60} />
      </Card.Body>
    </Card>
  );
};

export default SkeletonCard;
