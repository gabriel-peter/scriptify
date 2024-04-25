create type transfer_request_status as enum (
    'pending',
    'pharmacist-filled',
    'complete'
);
alter table transfer_requests 
add request_status transfer_request_status 
DEFAULT 'pending';