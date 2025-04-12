export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          details: string | null
          entity: string
          log_id: number
          timestamp: string | null
          user_id: number
        }
        Insert: {
          action: string
          details?: string | null
          entity: string
          log_id?: never
          timestamp?: string | null
          user_id: number
        }
        Update: {
          action?: string
          details?: string | null
          entity?: string
          log_id?: never
          timestamp?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      assoc_bus_assignments: {
        Row: {
          assignment_id: number
          bus_id: number
          student_id: number
        }
        Insert: {
          assignment_id?: never
          bus_id: number
          student_id: number
        }
        Update: {
          assignment_id?: never
          bus_id?: number
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "assoc_bus_assignments_bus_id_fkey"
            columns: ["bus_id"]
            isOneToOne: false
            referencedRelation: "buses"
            referencedColumns: ["bus_id"]
          },
          {
            foreignKeyName: "assoc_bus_assignments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      assoc_event_participation: {
        Row: {
          event_id: number
          participant_id: number
          participant_type: string
          participation_id: number
        }
        Insert: {
          event_id: number
          participant_id: number
          participant_type: string
          participation_id?: never
        }
        Update: {
          event_id?: number
          participant_id?: number
          participant_type?: string
          participation_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "assoc_event_participation_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
        ]
      }
      assoc_role_permissions: {
        Row: {
          permission_id: number
          role_id: number
        }
        Insert: {
          permission_id: number
          role_id: number
        }
        Update: {
          permission_id?: number
          role_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "assoc_role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "assoc_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
        ]
      }
      assoc_user_roles: {
        Row: {
          role_id: number
          user_id: number
          user_role_id: number
        }
        Insert: {
          role_id: number
          user_id: number
          user_role_id?: never
        }
        Update: {
          role_id?: number
          user_id?: number
          user_role_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "assoc_user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "assoc_user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      attendance: {
        Row: {
          attendance_id: number
          class_date: string
          status: string
          student_id: number
          subject_id: number
        }
        Insert: {
          attendance_id?: never
          class_date: string
          status: string
          student_id: number
          subject_id: number
        }
        Update: {
          attendance_id?: never
          class_date?: string
          status?: string
          student_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "attendance_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      books: {
        Row: {
          author: string
          available_copies: number
          book_id: number
          isbn: string
          published_year: number
          title: string
          total_copies: number
        }
        Insert: {
          author: string
          available_copies: number
          book_id?: never
          isbn: string
          published_year: number
          title: string
          total_copies: number
        }
        Update: {
          author?: string
          available_copies?: number
          book_id?: never
          isbn?: string
          published_year?: number
          title?: string
          total_copies?: number
        }
        Relationships: []
      }
      buses: {
        Row: {
          bus_id: number
          bus_number: string
          capacity: number
          route_id: number
        }
        Insert: {
          bus_id?: never
          bus_number: string
          capacity: number
          route_id: number
        }
        Update: {
          bus_id?: never
          bus_number?: string
          capacity?: number
          route_id?: number
        }
        Relationships: []
      }
      classes: {
        Row: {
          class_id: number
          class_name: string
          year: number
        }
        Insert: {
          class_id?: never
          class_name: string
          year: number
        }
        Update: {
          class_id?: never
          class_name?: string
          year?: number
        }
        Relationships: []
      }
      dim_date: {
        Row: {
          date_id: number
          day: number
          full_date: string
          month: number
          weekday: string
          year: number
        }
        Insert: {
          date_id?: never
          day: number
          full_date: string
          month: number
          weekday: string
          year: number
        }
        Update: {
          date_id?: never
          day?: number
          full_date?: string
          month?: number
          weekday?: string
          year?: number
        }
        Relationships: []
      }
      dim_event: {
        Row: {
          event_date: string
          event_id: number
          event_name: string
          organizer_name: string | null
        }
        Insert: {
          event_date: string
          event_id: number
          event_name: string
          organizer_name?: string | null
        }
        Update: {
          event_date?: string
          event_id?: number
          event_name?: string
          organizer_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dim_event_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: true
            referencedRelation: "events"
            referencedColumns: ["event_id"]
          },
        ]
      }
      dim_student: {
        Row: {
          class_name: string | null
          full_name: string
          student_id: number
        }
        Insert: {
          class_name?: string | null
          full_name: string
          student_id: number
        }
        Update: {
          class_name?: string | null
          full_name?: string
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "dim_student_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      dim_subject: {
        Row: {
          class_name: string | null
          subject_id: number
          subject_name: string
        }
        Insert: {
          class_name?: string | null
          subject_id: number
          subject_name: string
        }
        Update: {
          class_name?: string | null
          subject_id?: number
          subject_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "dim_subject_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: true
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      dim_teacher: {
        Row: {
          department_name: string | null
          full_name: string
          specialization: string | null
          teacher_id: number
        }
        Insert: {
          department_name?: string | null
          full_name: string
          specialization?: string | null
          teacher_id: number
        }
        Update: {
          department_name?: string | null
          full_name?: string
          specialization?: string | null
          teacher_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "dim_teacher_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: true
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
        ]
      }
      divisions: {
        Row: {
          class_id: number
          division_id: number
          section: string
        }
        Insert: {
          class_id: number
          division_id?: never
          section: string
        }
        Update: {
          class_id?: number
          division_id?: never
          section?: string
        }
        Relationships: [
          {
            foreignKeyName: "divisions_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["class_id"]
          },
        ]
      }
      events: {
        Row: {
          description: string | null
          event_date: string
          event_id: number
          event_name: string
          organizer_id: number
        }
        Insert: {
          description?: string | null
          event_date: string
          event_id?: never
          event_name: string
          organizer_id: number
        }
        Update: {
          description?: string | null
          event_date?: string
          event_id?: never
          event_name?: string
          organizer_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
        ]
      }
      exams: {
        Row: {
          class_id: number
          exam_date: string
          exam_id: number
          exam_name: string
        }
        Insert: {
          class_id: number
          exam_date: string
          exam_id?: never
          exam_name: string
        }
        Update: {
          class_id?: number
          exam_date?: string
          exam_id?: never
          exam_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["class_id"]
          },
        ]
      }
      fact_attendance: {
        Row: {
          attendance_id: number
          date_id: number
          status: string
          student_id: number
          subject_id: number
        }
        Insert: {
          attendance_id: number
          date_id: number
          status: string
          student_id: number
          subject_id: number
        }
        Update: {
          attendance_id?: number
          date_id?: number
          status?: string
          student_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fact_attendance_date_id_fkey"
            columns: ["date_id"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_id"]
          },
          {
            foreignKeyName: "fact_attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "dim_student"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "fact_attendance_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "dim_subject"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      fact_event_participation: {
        Row: {
          event_id: number
          participant_id: number
          participant_type: string
          participation_id: number
        }
        Insert: {
          event_id: number
          participant_id: number
          participant_type: string
          participation_id: number
        }
        Update: {
          event_id?: number
          participant_id?: number
          participant_type?: string
          participation_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fact_event_participation_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "dim_event"
            referencedColumns: ["event_id"]
          },
        ]
      }
      fact_results: {
        Row: {
          date_id: number
          grade: string | null
          marks_obtained: number
          result_id: number
          student_id: number
          subject_id: number
        }
        Insert: {
          date_id: number
          grade?: string | null
          marks_obtained: number
          result_id: number
          student_id: number
          subject_id: number
        }
        Update: {
          date_id?: number
          grade?: string | null
          marks_obtained?: number
          result_id?: number
          student_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fact_results_date_id_fkey"
            columns: ["date_id"]
            isOneToOne: false
            referencedRelation: "dim_date"
            referencedColumns: ["date_id"]
          },
          {
            foreignKeyName: "fact_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "dim_student"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "fact_results_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "dim_subject"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      fee_payments: {
        Row: {
          amount_paid: number
          fee_id: number
          payment_date: string
          payment_id: number
          payment_method: string
          student_id: number
        }
        Insert: {
          amount_paid: number
          fee_id: number
          payment_date: string
          payment_id?: never
          payment_method: string
          student_id: number
        }
        Update: {
          amount_paid?: number
          fee_id?: number
          payment_date?: string
          payment_id?: never
          payment_method?: string
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fee_payments_fee_id_fkey"
            columns: ["fee_id"]
            isOneToOne: false
            referencedRelation: "fee_structures"
            referencedColumns: ["fee_id"]
          },
          {
            foreignKeyName: "fee_payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      fee_structures: {
        Row: {
          class_id: number
          fee_id: number
          total_amount: number
        }
        Insert: {
          class_id: number
          fee_id?: never
          total_amount: number
        }
        Update: {
          class_id?: number
          fee_id?: never
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "fee_structures_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["class_id"]
          },
        ]
      }
      feedback: {
        Row: {
          entity_id: number
          feedback_date: string | null
          feedback_id: number
          feedback_text: string
          feedback_type: string
          rating: number | null
          student_id: number
        }
        Insert: {
          entity_id: number
          feedback_date?: string | null
          feedback_id?: never
          feedback_text: string
          feedback_type: string
          rating?: number | null
          student_id: number
        }
        Update: {
          entity_id?: number
          feedback_date?: string | null
          feedback_id?: never
          feedback_text?: string
          feedback_type?: string
          rating?: number | null
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "feedback_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      financial_analytics: {
        Row: {
          class_id: number
          finance_id: number
          outstanding_fees: number | null
          report_date: string | null
          total_fees_collected: number | null
        }
        Insert: {
          class_id: number
          finance_id?: never
          outstanding_fees?: number | null
          report_date?: string | null
          total_fees_collected?: number | null
        }
        Update: {
          class_id?: number
          finance_id?: never
          outstanding_fees?: number | null
          report_date?: string | null
          total_fees_collected?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_analytics_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["class_id"]
          },
        ]
      }
      library_records: {
        Row: {
          book_id: number
          issue_date: string
          record_id: number
          return_date: string | null
          status: string
          student_id: number
        }
        Insert: {
          book_id: number
          issue_date: string
          record_id?: never
          return_date?: string | null
          status: string
          student_id: number
        }
        Update: {
          book_id?: number
          issue_date?: string
          record_id?: never
          return_date?: string | null
          status?: string
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "library_records_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "books"
            referencedColumns: ["book_id"]
          },
          {
            foreignKeyName: "library_records_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      parents: {
        Row: {
          parent_id: number
          relationship: string
          student_id: number
          user_id: number
        }
        Insert: {
          parent_id?: never
          relationship: string
          student_id: number
          user_id: number
        }
        Update: {
          parent_id?: never
          relationship?: string
          student_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "parents_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "parents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          avg_attendance_rate: number | null
          avg_exam_score: number | null
          metric_id: number
          student_id: number
          subject_id: number
        }
        Insert: {
          avg_attendance_rate?: number | null
          avg_exam_score?: number | null
          metric_id?: never
          student_id: number
          subject_id: number
        }
        Update: {
          avg_attendance_rate?: number | null
          avg_exam_score?: number | null
          metric_id?: never
          student_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "performance_metrics_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          description: string | null
          permission_id: number
          permission_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          permission_id?: never
          permission_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          permission_id?: never
          permission_name?: string
        }
        Relationships: []
      }
      results: {
        Row: {
          exam_id: number
          grade: string | null
          marks_obtained: number
          result_id: number
          student_id: number
          subject_id: number
        }
        Insert: {
          exam_id: number
          grade?: string | null
          marks_obtained: number
          result_id?: never
          student_id: number
          subject_id: number
        }
        Update: {
          exam_id?: number
          grade?: string | null
          marks_obtained?: number
          result_id?: never
          student_id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "results_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["exam_id"]
          },
          {
            foreignKeyName: "results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
          {
            foreignKeyName: "results_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          role_id: number
          role_name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          role_id?: never
          role_name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          role_id?: never
          role_name?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          ending_point: string
          route_id: number
          route_name: string
          starting_point: string
        }
        Insert: {
          ending_point: string
          route_id?: never
          route_name: string
          starting_point: string
        }
        Update: {
          ending_point?: string
          route_id?: never
          route_name?: string
          starting_point?: string
        }
        Relationships: []
      }
      student_progression: {
        Row: {
          class_id: number
          progression_id: number
          promotion_date: string | null
          status: string
          student_id: number
        }
        Insert: {
          class_id: number
          progression_id?: never
          promotion_date?: string | null
          status: string
          student_id: number
        }
        Update: {
          class_id?: number
          progression_id?: never
          promotion_date?: string | null
          status?: string
          student_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "student_progression_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["class_id"]
          },
          {
            foreignKeyName: "student_progression_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      students: {
        Row: {
          class_id: number
          dob: string
          enrollment_number: string
          student_id: number
          user_id: number
        }
        Insert: {
          class_id: number
          dob: string
          enrollment_number: string
          student_id?: never
          user_id: number
        }
        Update: {
          class_id?: number
          dob?: string
          enrollment_number?: string
          student_id?: never
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "students_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      subjects: {
        Row: {
          subject_code: string
          subject_id: number
          subject_name: string
        }
        Insert: {
          subject_code: string
          subject_id?: never
          subject_name: string
        }
        Update: {
          subject_code?: string
          subject_id?: never
          subject_name?: string
        }
        Relationships: []
      }
      teacher_subject_assoc: {
        Row: {
          assoc_id: number
          division_id: number
          subject_id: number
          teacher_id: number
        }
        Insert: {
          assoc_id?: never
          division_id: number
          subject_id: number
          teacher_id: number
        }
        Update: {
          assoc_id?: never
          division_id?: number
          subject_id?: number
          teacher_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subject_assoc_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["division_id"]
          },
          {
            foreignKeyName: "teacher_subject_assoc_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
          {
            foreignKeyName: "teacher_subject_assoc_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
        ]
      }
      teachers: {
        Row: {
          department_id: number
          dob: string
          specialization: string | null
          teacher_id: number
          user_id: number
        }
        Insert: {
          department_id: number
          dob: string
          specialization?: string | null
          teacher_id?: never
          user_id: number
        }
        Update: {
          department_id?: number
          dob?: string
          specialization?: string | null
          teacher_id?: never
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teachers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      timetable: {
        Row: {
          day: string
          division_id: number
          end_time: string
          period_number: number
          start_time: string
          subject_id: number
          timetable_id: number
        }
        Insert: {
          day: string
          division_id: number
          end_time: string
          period_number: number
          start_time: string
          subject_id: number
          timetable_id?: never
        }
        Update: {
          day?: string
          division_id?: number
          end_time?: string
          period_number?: number
          start_time?: string
          subject_id?: number
          timetable_id?: never
        }
        Relationships: [
          {
            foreignKeyName: "timetable_division_id_fkey"
            columns: ["division_id"]
            isOneToOne: false
            referencedRelation: "divisions"
            referencedColumns: ["division_id"]
          },
          {
            foreignKeyName: "timetable_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["subject_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          disabled_date: string | null
          email: string
          is_active: boolean | null
          last_timezone: string | null
          password_hash: string
          successive_failed_logins: number | null
          updated_at: string | null
          user_id: number
          username: string
        }
        Insert: {
          created_at?: string | null
          disabled_date?: string | null
          email: string
          is_active?: boolean | null
          last_timezone?: string | null
          password_hash: string
          successive_failed_logins?: number | null
          updated_at?: string | null
          user_id?: never
          username: string
        }
        Update: {
          created_at?: string | null
          disabled_date?: string | null
          email?: string
          is_active?: boolean | null
          last_timezone?: string | null
          password_hash?: string
          successive_failed_logins?: number | null
          updated_at?: string | null
          user_id?: never
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
