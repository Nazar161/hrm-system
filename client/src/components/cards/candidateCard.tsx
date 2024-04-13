import { FC } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Link } from '@tanstack/react-router';

interface Props {
  id: string;
  position: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
}

const CandidateCard: FC<Props> = ({ id, position, firstName, lastName, email, phone }: Props) => {
  return (
    <div className="h-full p-1" key={id}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{position}</CardTitle>
          <CardDescription>
            {firstName} {lastName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{email}</p>
          <p>{phone}</p>
        </CardContent>
        <CardFooter>
          <Button>
            <Link to="/candidate/$id" params={{ id: id }}>
              Перейти
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CandidateCard;
