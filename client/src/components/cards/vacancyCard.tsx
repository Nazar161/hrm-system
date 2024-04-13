import { FC } from 'react';

import { Link } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Button } from '../ui/button';

interface Props {
  id: string;
  title: string;
  description: string;
  minSalary: number | null;
  maxSalary: number | null;
}

const VacancyCard: FC<Props> = ({ id, title, description, minSalary, maxSalary }: Props) => {
  return (
    <div className="h-full p-1" key={id}>
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {minSalary} - {maxSalary}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
        <CardFooter>
          <Button>
            <Link to="/vacancy/$id" params={{ id: id }}>
              Перейти
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VacancyCard;
