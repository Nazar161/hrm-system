import { FC } from 'react';

import { Link } from '@tanstack/react-router';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface Props {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  vacancyMinSalary: number | null;
  vacancyMaxSalary: number | null;
  candidateId: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidatePosition: string;
}

const ApplicationCard: FC<Props> = ({
  id,
  vacancyId,
  vacancyTitle,
  vacancyMinSalary,
  vacancyMaxSalary,
  candidateId,
  candidateFirstName,
  candidateLastName,
  candidatePosition,
}: Props) => {
  return (
    <div className="h-full p-1">
      <Card className="h-full">
        <CardHeader>
          <Link
            to="/vacancy/$id"
            params={{ id: vacancyId }}
            className="rounded-md border p-2 hover:bg-slate-200"
          >
            <CardDescription>Отклик на вакансию:</CardDescription>
            <CardTitle>{vacancyTitle}</CardTitle>
            <p>
              {vacancyMinSalary && `от ${vacancyMinSalary}`} {vacancyMaxSalary && `до ${vacancyMaxSalary}`}
            </p>
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Link
            to="/candidate/$id"
            params={{ id: candidateId }}
            className="rounded-md border p-2 hover:bg-slate-200"
          >
            <CardDescription>Кандидат:</CardDescription>
            <CardTitle>{candidatePosition}</CardTitle>
            <p>
              {candidateFirstName} {candidateLastName}
            </p>
          </Link>
        </CardContent>
        <CardFooter>
          <Link to="/application/$id" params={{ id: id }}>
            <Button variant='secondary'>Перейти к отклику</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ApplicationCard;
