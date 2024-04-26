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
          <CardTitle className="line-clamp-2 h-10 leading-5">{title}</CardTitle>
          <CardDescription>
            {minSalary && maxSalary
              ? `${minSalary} - ${maxSalary}`
              : !!minSalary
                ? `от ${minSalary}`
                : !!maxSalary
                  ? `до ${maxSalary}`
                  : 'Зарплата не указана'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">{description}</p>
        </CardContent>
        <CardFooter>
          <Link to="/vacancy/$id" params={{ id: id }}>
            <Button variant="secondary">Перейти</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VacancyCard;
