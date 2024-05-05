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
      insurance_details: {
        Row: {
          bin: string | null
          created_at: string | null
          holder_first_name: string | null
          holder_last_name: string | null
          id: string
          insurance_id: string | null
          insurance_name: string | null
          insurance_num: string | null
          pcn: string | null
          rx_group_num: string | null
          ssn: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bin?: string | null
          created_at?: string | null
          holder_first_name?: string | null
          holder_last_name?: string | null
          id?: string
          insurance_id?: string | null
          insurance_name?: string | null
          insurance_num?: string | null
          pcn?: string | null
          rx_group_num?: string | null
          ssn?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bin?: string | null
          created_at?: string | null
          holder_first_name?: string | null
          holder_last_name?: string | null
          id?: string
          insurance_id?: string | null
          insurance_name?: string | null
          insurance_num?: string | null
          pcn?: string | null
          rx_group_num?: string | null
          ssn?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "insurance_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_on_boaring_complete: {
        Row: {
          id: string
          steps: Json | null
        }
        Insert: {
          id: string
          steps?: Json | null
        }
        Update: {
          id?: string
          steps?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_on_boaring_complete_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      payments_details: {
        Row: {
          card_number: string
          created_at: string
          cvv: number
          expiration: string
          holder_first_name: string
          holder_last_name: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          card_number: string
          created_at: string
          cvv: number
          expiration: string
          holder_first_name: string
          holder_last_name: string
          id?: string
          updated_at: string
          user_id: string
        }
        Update: {
          card_number?: string
          created_at?: string
          cvv?: number
          expiration?: string
          holder_first_name?: string
          holder_last_name?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_transfers: {
        Row: {
          created_at: string | null
          drug_name: string
          id: string
          pharmacist_first_name: string
          pharmacist_last_name: string
          pharmacist_license_number: string
          refill_date: string | null
          rx_name: string
          transfer_request_id: string
        }
        Insert: {
          created_at?: string | null
          drug_name: string
          id?: string
          pharmacist_first_name: string
          pharmacist_last_name: string
          pharmacist_license_number: string
          refill_date?: string | null
          rx_name: string
          transfer_request_id: string
        }
        Update: {
          created_at?: string | null
          drug_name?: string
          id?: string
          pharmacist_first_name?: string
          pharmacist_last_name?: string
          pharmacist_license_number?: string
          refill_date?: string | null
          rx_name?: string
          transfer_request_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prescription_transfers_transfer_request_id_fkey"
            columns: ["transfer_request_id"]
            isOneToOne: false
            referencedRelation: "transfer_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address1: string
          address2: string | null
          avatar_url: string | null
          city: string
          created_at: string
          date_of_birth: string
          driver_license_url: string | null
          first_name: string
          id: string
          is_test_user: boolean
          last_name: string
          sex: string
          state_enum: Database["public"]["Enums"]["us_state"]
          updated_at: string
          zip_code: string
        }
        Insert: {
          address1: string
          address2?: string | null
          avatar_url?: string | null
          city: string
          created_at: string
          date_of_birth: string
          driver_license_url?: string | null
          first_name: string
          id: string
          is_test_user?: boolean
          last_name: string
          sex: string
          state_enum: Database["public"]["Enums"]["us_state"]
          updated_at: string
          zip_code: string
        }
        Update: {
          address1?: string
          address2?: string | null
          avatar_url?: string | null
          city?: string
          created_at?: string
          date_of_birth?: string
          driver_license_url?: string | null
          first_name?: string
          id?: string
          is_test_user?: boolean
          last_name?: string
          sex?: string
          state_enum?: Database["public"]["Enums"]["us_state"]
          updated_at?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      transfer_requests: {
        Row: {
          created_at: string | null
          id: string
          pharmacy_email: string | null
          pharmacy_name: string | null
          pharmacy_phone_number: string | null
          request_status:
            | Database["public"]["Enums"]["transfer_request_status"]
            | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          pharmacy_email?: string | null
          pharmacy_name?: string | null
          pharmacy_phone_number?: string | null
          request_status?:
            | Database["public"]["Enums"]["transfer_request_status"]
            | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          pharmacy_email?: string | null
          pharmacy_name?: string | null
          pharmacy_phone_number?: string | null
          request_status?:
            | Database["public"]["Enums"]["transfer_request_status"]
            | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfer_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      role: "ADMIN" | "PATIENT" | "PHARMACIST"
      transfer_request_status: "pending" | "pharmacist-filled" | "complete"
      us_state:
        | "Alabama"
        | "Alaska"
        | "Arizona"
        | "Arkansas"
        | "California"
        | "Colorado"
        | "Connecticut"
        | "Delaware"
        | "Florida"
        | "Georgia"
        | "Hawaii"
        | "Idaho"
        | "Illinois"
        | "Indiana"
        | "Iowa"
        | "Kansas"
        | "Kentucky"
        | "Louisiana"
        | "Maine"
        | "Maryland"
        | "Massachusetts"
        | "Michigan"
        | "Minnesota"
        | "Mississippi"
        | "Missouri"
        | "Montana"
        | "Nebraska"
        | "Nevada"
        | "New Hampshire"
        | "New Jersey"
        | "New Mexico"
        | "New York"
        | "North Carolina"
        | "North Dakota"
        | "Ohio"
        | "Oklahoma"
        | "Oregon"
        | "Pennsylvania"
        | "Rhode Island"
        | "South Carolina"
        | "South Dakota"
        | "Tennessee"
        | "Texas"
        | "Utah"
        | "Vermont"
        | "Virginia"
        | "Washington"
        | "West Virginia"
        | "Wisconsin"
        | "Wyoming"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

