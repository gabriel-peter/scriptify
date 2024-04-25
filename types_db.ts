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
          holder_first_name: string | null
          holder_last_name: string | null
          insurance_id: string | null
          insurance_name: string | null
          insurance_num: string | null
          pcn: string | null
          rx_group_num: string | null
          ssn: string | null
        }
        Insert: {
          bin?: string | null
          holder_first_name?: string | null
          holder_last_name?: string | null
          insurance_id?: string | null
          insurance_name?: string | null
          insurance_num?: string | null
          pcn?: string | null
          rx_group_num?: string | null
          ssn?: string | null
        }
        Update: {
          bin?: string | null
          holder_first_name?: string | null
          holder_last_name?: string | null
          insurance_id?: string | null
          insurance_name?: string | null
          insurance_num?: string | null
          pcn?: string | null
          rx_group_num?: string | null
          ssn?: string | null
        }
        Relationships: []
      }
      payments_details: {
        Row: {
          card_number: string
          created_at: string | null
          cvv: number
          expiration: string
          holder_first_name: string
          holder_last_name: string
          updated_at: string | null
        }
        Insert: {
          card_number: string
          created_at?: string | null
          cvv: number
          expiration: string
          holder_first_name: string
          holder_last_name: string
          updated_at?: string | null
        }
        Update: {
          card_number?: string
          created_at?: string | null
          cvv?: number
          expiration?: string
          holder_first_name?: string
          holder_last_name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      prescription_transfers: {
        Row: {
          created_at: string | null
          drug_name: string
          pharmacist_first_name: string
          pharmacist_last_name: string
          pharmacist_license_number: string
          refill_date: string | null
          rx_name: string
        }
        Insert: {
          created_at?: string | null
          drug_name: string
          pharmacist_first_name: string
          pharmacist_last_name: string
          pharmacist_license_number: string
          refill_date?: string | null
          rx_name: string
        }
        Update: {
          created_at?: string | null
          drug_name?: string
          pharmacist_first_name?: string
          pharmacist_last_name?: string
          pharmacist_license_number?: string
          refill_date?: string | null
          rx_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          driver_license_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          mailing_address: Json | null
          preferences: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          driver_license_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          mailing_address?: Json | null
          preferences?: Json | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          driver_license_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          mailing_address?: Json | null
          preferences?: Json | null
          updated_at?: string | null
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
          magic_url_key: string | null
          mailing_address: Json | null
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
          magic_url_key?: string | null
          mailing_address?: Json | null
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
          magic_url_key?: string | null
          mailing_address?: Json | null
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
      transfer_request_status: "pending" | "pharmacist-filled" | "complete"
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

