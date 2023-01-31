package br.com.adoteme.service;

import br.com.adoteme.config.exception.AppErrors;
import br.com.adoteme.config.exception.AppException;
import br.com.adoteme.config.security.TokenProvider;
import br.com.adoteme.model.entity.Cliente;
import br.com.adoteme.model.entity.Estado;
import br.com.adoteme.model.entity.Role;
import br.com.adoteme.model.request.ClienteRequest;
import br.com.adoteme.model.request.ClienteUpdateRequest;
import br.com.adoteme.model.request.DeleteClienteRequest;
import br.com.adoteme.model.request.LoginRequest;
import br.com.adoteme.model.response.ClienteResponse;
import br.com.adoteme.model.response.LoginResponse;
import br.com.adoteme.repository.ClienteRepository;
import br.com.adoteme.repository.EstadoRepository;
import br.com.adoteme.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteService {

    private final ClienteRepository repository;
    private final EstadoRepository estadoRepository;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public void createCliente(ClienteRequest request) {
        Optional<Cliente> clienteExiste = repository.findByEmail(request.getEmail());

        if (clienteExiste.isPresent()) {
            throw AppException.of(AppErrors.USER_ALREADY_EXISTS);
        }

        Estado estado = estadoRepository.findById(request.getEstado()).orElseThrow(EntityNotFoundException::new);

        repository.save(
        Cliente.builder()
                .nome(request.getNome())
                .email(request.getEmail().toLowerCase())
                .senha(encryptPassword(request.getSenha()))
                .documento(request.getDocumento())
                .telefone(request.getTelefone())
                .logradouro(request.getLogradouro())
                .complemento(request.getComplemento())
                .cidade(request.getCidade())
                .estado(estado)
                .bairro(request.getBairro())
                .cep(request.getCep())
                .role(addRole())
                .status(true)
                .build()
        );
    }

    private String encryptPassword (String senha) {
        return passwordEncoder.encode(senha);
    }

    private Role addRole() {
        return roleRepository.findByNome("ROLE_CLIENTE");
    }

    public ClienteResponse updateCliente(ClienteUpdateRequest request) {

        Cliente cliente = repository.findById(request.getCodigo()).orElseThrow(EntityNotFoundException::new);
        Estado estado = estadoRepository.findById(request.getEstado()).orElseThrow(EntityNotFoundException::new);

        if (Objects.equals(request.getSenha(), "")) {
            throw AppException.of(AppErrors.BAD_REQUEST_ERROR);
        }

        cliente.setNome(request.getNome());
        cliente.setSenha(encryptPassword(request.getSenha().trim()));
        cliente.setTelefone(request.getTelefone());
        cliente.setLogradouro(request.getLogradouro());
        cliente.setComplemento(request.getComplemento());
        cliente.setBairro(request.getBairro());
        cliente.setCidade(request.getCidade());
        cliente.setEstado(estado);
        cliente.setCep(request.getCep());

        return new ClienteResponse(repository.save(cliente));
    }

    public void deleteCliente(DeleteClienteRequest deleteClienteRequest) {
        Cliente cliente = repository.findById(deleteClienteRequest.getCodigo()).orElseThrow(EntityNotFoundException::new);

        if (!passwordEncoder.matches(deleteClienteRequest.getSenha(), cliente.getSenha())) {
            throw AppException.of(AppErrors.BAD_REQUEST_ERROR);
        }

        Estado estado = estadoRepository.findByNome("Usuário desativado");

        cliente.setNome("Usuário desconhecido");
        cliente.setDocumento("Usuário desativado");
        cliente.setTelefone("Usuário desativado");
        cliente.setLogradouro("Usuário desativado");
        cliente.setComplemento("Usuário desativado");
        cliente.setCidade("Usuário desativado");
        cliente.setEstado(estado);
        cliente.setCep("0");
        cliente.setBairro("Usuário desativado");
        cliente.setStatus(false);

        repository.save(cliente);
    }

    public LoginResponse autenticarCliente(LoginRequest loginRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getSenha())
            );
            SecurityContextHolder.getContext().setAuthentication(auth);

            Optional<Cliente> cliente = repository.findByEmail(loginRequest.getEmail());
            if (cliente.isPresent()) {
                return new LoginResponse(tokenProvider.generateToken(auth), cliente.get().getRole().getNome(), new ClienteResponse(cliente.get()));
            }
        } catch (AuthenticationException e) {
            throw AppException.of(AppErrors.UNAUTHORIZED_ERROR);
        }

        return null;
    }
}
