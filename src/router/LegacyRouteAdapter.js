import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default function LegacyRouteAdapter({ Component }) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const history = {
    push: (to) => navigate(to),
    replace: (to) => navigate(to, { replace: true }),
    goBack: () => navigate(-1),
    goForward: () => navigate(1)
  };

  const match = { params };
  return <Component history={history} location={location} match={match} />;
}
