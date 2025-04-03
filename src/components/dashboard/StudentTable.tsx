
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ChevronsUpDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Student } from '@/types';
import { calculateAttendancePercentage, calculateAverageMarks } from '@/utils/mockData';

interface Column {
  key: string;
  header: string;
  cell: (student: Student) => React.ReactNode;
  sortable?: boolean;
}

interface StudentTableProps {
  students: Student[];
  showDetails?: boolean;
  showActions?: boolean;
  detailsPath?: string;
}

const StudentTable: React.FC<StudentTableProps> = ({ 
  students, 
  showDetails = true,
  showActions = true,
  detailsPath = '/teacher/student'
}) => {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortColumn === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(key);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (key: string) => {
    if (sortColumn !== key) return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  const columns: Column[] = [
    {
      key: 'rollNumber',
      header: 'Roll No',
      cell: (student) => student.rollNumber,
      sortable: true,
    },
    {
      key: 'name',
      header: 'Name',
      cell: (student) => student.name,
      sortable: true,
    },
    {
      key: 'class',
      header: 'Class',
      cell: (student) => `${student.class} ${student.section}`,
      sortable: true,
    },
    ...(showDetails
      ? [
          {
            key: 'attendance',
            header: 'Attendance',
            cell: (student) => {
              const percentage = calculateAttendancePercentage(student.id);
              return (
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        percentage >= 90
                          ? 'bg-green-500'
                          : percentage >= 75
                          ? 'bg-yellow-400'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{percentage.toFixed(1)}%</span>
                </div>
              );
            },
            sortable: true,
          },
          {
            key: 'performance',
            header: 'Performance',
            cell: (student) => {
              const avgMarks = calculateAverageMarks(student.id);
              return (
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${
                        avgMarks >= 90
                          ? 'bg-green-500'
                          : avgMarks >= 75
                          ? 'bg-yellow-400'
                          : avgMarks >= 60
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${avgMarks}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm">{avgMarks.toFixed(1)}%</span>
                </div>
              );
            },
            sortable: true,
          },
        ]
      : []),
    ...(showActions
      ? [
          {
            key: 'actions',
            header: 'Actions',
            cell: (student) => (
              <div className="flex justify-end">
                <Link to={`${detailsPath}/${student.id}`}>
                  <Button size="sm" variant="ghost">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
              </div>
            ),
            sortable: false,
          },
        ]
      : []),
  ];

  const sortedStudents = React.useMemo(() => {
    if (!sortColumn) return students;

    return [...students].sort((a, b) => {
      if (sortColumn === 'attendance') {
        const aAttendance = calculateAttendancePercentage(a.id);
        const bAttendance = calculateAttendancePercentage(b.id);
        return sortDirection === 'asc'
          ? aAttendance - bAttendance
          : bAttendance - aAttendance;
      }

      if (sortColumn === 'performance') {
        const aPerformance = calculateAverageMarks(a.id);
        const bPerformance = calculateAverageMarks(b.id);
        return sortDirection === 'asc'
          ? aPerformance - bPerformance
          : bPerformance - aPerformance;
      }

      // @ts-ignore
      const aValue = a[sortColumn];
      // @ts-ignore
      const bValue = b[sortColumn];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // @ts-ignore
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
  }, [students, sortColumn, sortDirection]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={column.sortable ? 'cursor-pointer' : ''}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
              >
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && getSortIcon(column.key)}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No students found
              </TableCell>
            </TableRow>
          ) : (
            sortedStudents.map((student) => (
              <TableRow key={student.id}>
                {columns.map((column) => (
                  <TableCell key={`${student.id}-${column.key}`}>
                    {column.cell(student)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
